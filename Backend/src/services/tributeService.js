const Tribute = require("../models/Tribute");
const imagekit = require("../config/imagekit");
const fs = require("fs");
const AppError = require("../utils/AppError");


exports.createTribute = async (req) => {
  const { title, description } = req.body;

  if (!title || !description || !req.file) {
throw new AppError("All fields including image are required", 400);  }

  // Read file from local uploads folder
  const fileBuffer = fs.readFileSync(req.file.path);
  const base64File = fileBuffer.toString("base64");

  // Upload to ImageKit
  const uploadResponse = await imagekit.upload({
    file: base64File,
    fileName: req.file.filename,
    folder: "/tributes"
  });

  // Delete local file after upload (clean storage)
  fs.unlinkSync(req.file.path);

  const tribute = await Tribute.create({
    title,
    description,
    imageUrl: uploadResponse.url,
    createdBy: req.user._id
  });

  return tribute;
};

exports.updateTribute = async (req) => {
  const tributeId = req.params.id;
  const { title, description } = req.body;

  const tribute = await Tribute.findById(tributeId);

  if (!tribute) {
throw new AppError("Tribute not found", 404);  }

  // Ownership check
  if (tribute.createdBy.toString() !== req.user._id.toString()) {
throw new AppError("You are not authorized to update this tribute", 403);  }

  // Update fields if provided
  if (title) tribute.title = title;
  if (description) tribute.description = description;

  // If new image uploaded
  if (req.file) {
    const fs = require("fs");
    const imagekit = require("../config/imagekit");

    const fileBuffer = fs.readFileSync(req.file.path);
    const base64File = fileBuffer.toString("base64");

    const uploadResponse = await imagekit.upload({
      file: base64File,
      fileName: req.file.filename,
      folder: "/tributes"
    });

    fs.unlinkSync(req.file.path);

    tribute.imageUrl = uploadResponse.url;
  }

  await tribute.save();

  return tribute;
};

exports.deleteTribute = async (req) => {
  const tributeId = req.params.id;

  const tribute = await Tribute.findById(tributeId);

  if (!tribute) {
throw new AppError("Tribute not found", 404);  }

  if (tribute.createdBy.toString() !== req.user._id.toString()) {
throw new AppError("You are not authorized to delete this tribute", 403);  }

  await tribute.deleteOne();
};

exports.getAllTributes = async () => {
  const tributes = await Tribute.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  return tributes;
};
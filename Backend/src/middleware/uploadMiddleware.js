const multer = require("multer");
const path = require("path");
const { createFolderIfNotExists } = require("../utils/folderutility");

// Define upload folder
const uploadPath = path.join(__dirname, "../../uploads");

// Ensure folder exists
createFolderIfNotExists(uploadPath);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
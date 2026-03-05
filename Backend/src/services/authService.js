const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.registerUser = async (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email
  };

};

const generateToken = require("../utils/generateToken");

exports.loginUser = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    // throw new Error("Email and password required");
    const err = new Error("Email and password required");
    err.status_code = 400;
    throw err;
  }

  const user = await User.findOne({ email });

  if (!user) {
    //throw new Error("Invalid credentials");
    const err = new Error("Email and password required");
    err.status_code = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
   // throw new Error("Invalid credentials");
   const err = new Error("Invalid credentials");
    err.status_code = 401;
    throw err;
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
  };
};
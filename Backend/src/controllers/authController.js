const authService = require("../services/authService");

exports.registerUser = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await authService.loginUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    let status_code = 500;
    let mssg = "Internal Server Error";
    if(error.status_code) {
      status_code == error.status_code;
      mssg = error.message;
    }
    res.status(status_code).json({ message: mssg });
  }
};
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //  Extract token
      token = req.headers.authorization.split(" ")[1];

      //  Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //  Find user in DB (exclude password)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      //  Attach user to request
      req.user = user;

      next();
    } else {
      return res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authMiddleware;
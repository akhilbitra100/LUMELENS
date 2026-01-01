import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (req.method === 'GET' && req.originalUrl.startsWith('/photos?category=')) {
    return next();
}

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { authenticate };
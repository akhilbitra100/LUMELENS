import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Validate role
    if (!["buyer", "seller"].includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("Stored hashed password:", user.password);
    console.log("Entered plain text password:", password);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or password" });
    }

    // Generate JWT Token using the secret key from environment variables
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true }).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
      const { email, newPassword } = req.body;

      // Validate email format (optional, but recommended)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email format" });
      }

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      res.json({ message: "Password updated successfully" });
  } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Failed to update password" });
  }
};

export const getUserRole = (req, res) => {
  res.json({ role: req.user.role });
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send the user data as JSON
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import express from "express";
import { signup, signin, getUserRole, getUserProfile, forgotPassword } from "../controller/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/role", authenticate, getUserRole);
router.get("/:userId", authenticate, getUserProfile);
router.post("/forgot-password", forgotPassword);

export default router;

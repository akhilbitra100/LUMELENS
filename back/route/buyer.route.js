import express from "express";
import { getPurchasedImages } from "../controller/buyer.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/buyer/purchased-images
// Retrieves the list of purchased images for the authenticated buyer.
router.get("/purchased-images", authenticate, getPurchasedImages);

export default router;
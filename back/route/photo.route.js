import express from "express";
import {
  getPhotos,
  addPhoto,
  deletePhoto,
  updatePhoto,
} from "../controller/photo.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'photo-uploads',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage });

router.get("/", authenticate, getPhotos);
router.post("/", authenticate, upload.single("image"), addPhoto);
router.put("/:id", authenticate, upload.single("image"), updatePhoto);
router.delete("/:id", authenticate, deletePhoto);
router.get("/seller/:sellerId", authenticate, getPhotos);

export default router;
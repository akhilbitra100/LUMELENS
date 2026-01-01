import Photo from "../model/photo.model.js";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getPhotos = async (req, res) => {
  try {
    let query = {};
    
    const searchTerm = req.query.q;

    if (req.query.category) query = { category: req.query.category };

    if (req.params.sellerId) query = { ...query, sellerId: req.params.sellerId };

    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const photos = await Photo.find(query);
    res.json(photos);
  } catch (err) {
    console.error("Error fetching photos:", err);
    res.status(500).json({ error: "Failed to fetch photos", message: err.message });
  }
};

export const addPhoto = async (req, res) => {
  console.log("addPhoto controller called");
  if (req.user.role !== "seller") {
    console.log("Access Denied");
    return res.status(403).json({ message: "Access Denied" });
  }

  try {
    const { title, description, category, price } = req.body;
    const src = req.file ? req.file.path : null;

    if (!title || !src || !category || !price) {
      console.log("Missing required fields");
      return res
        .status(400)
        .json({ message: "Title, image, category, and price are required" });
    }

    const newPhoto = new Photo({
      title,
      src,
      description,
      category,
      price,
      sellerId: req.user._id,
    });

    console.log("Saving photo to database");
    const savedPhoto = await newPhoto.save();
    console.log("Photo saved successfully");
    res.status(201).json({ message: "Photo added successfully", photo: savedPhoto });
  } catch (err) {
    console.error("Error adding photo:", err);
    res.status(500).json({ error: "Failed to add photo", message: err.message });
  }
};

export const updatePhoto = async (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Access Denied" });
  }

  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo || photo.sellerId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Photo not found or unauthorized" });
    }

    const { title, description, category, price } = req.body;
    photo.title = title || photo.title;
    photo.description = description || photo.description;
    photo.category = category || photo.category;
    photo.price = price || photo.price;

    if (req.file) photo.src = req.file.path;

    const updatedPhoto = await photo.save();
    res.json({ message: "Photo updated successfully", photo: updatedPhoto });
  } catch (err) {
    console.error("Error updating photo:", err);
    res.status(500).json({ error: "Failed to update photo", message: err.message });
  }
};

export const deletePhoto = async (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Access Denied" });
  }

  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo || photo.sellerId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Photo not found or unauthorized" });
    }

    const cloudinaryUrl = photo.src;
    const publicId = cloudinaryUrl.substring(
      cloudinaryUrl.lastIndexOf("/") + 1,
      cloudinaryUrl.lastIndexOf(".")
    );

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    await Photo.findByIdAndDelete(req.params.id);
    res.json({ message: "Photo deleted successfully" });
  } catch (err) {
    console.error("Error deleting photo:", err);
    res.status(500).json({ error: "Failed to delete photo", message: err.message });
  }
};
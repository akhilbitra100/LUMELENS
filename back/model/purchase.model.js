import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    photoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
      required: true,
    },
    title: {
      type: String,
    },
    src: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);

export default Purchase;

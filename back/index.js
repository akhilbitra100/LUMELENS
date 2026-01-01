import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import stripe from "stripe";

import photoRoutes from "./route/photo.route.js";
import userRoutes from "./route/user.route.js";
import buyerRoutes from "./route/buyer.route.js";
import Purchase from "./model/purchase.model.js";

const app = express();
dotenv.config();

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
const URI = process.env.MongoDB_URI;

// connect to MongoDB
try {
  mongoose.connect(URI).then(() => {
    console.log("Connected to MongoDB");
  });
} catch (error) {
  console.log("Error: ", error);
}

// defining routes
app.use("/user", userRoutes);
app.use("/photos", photoRoutes);
app.use("/buyer", buyerRoutes);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems, userId } = req.body;
    console.log("userId received:", userId);

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title || item.name, // Use title if available, fallback to name
          images: [item.src || item.image], // Use src if available, fallback to image
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity || 1, // Default quantity to 1 if not provided
    }));

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success", // Use your actual success URL
      cancel_url: "http://localhost:5173/cancel", // Use your actual cancel URL
    });

    for (const item of cartItems) {
      try {
        await Purchase.create({
          userId: userId,
          photoId: item._id,
          title: item.title, // Save the title
          src: item.src, // Save the image URL
          description: item.description, // Save the description
          category: item.category, // Save the category
          price: item.price, // Save the price (redundant if you only use it for checkout)
          purchaseDate: new Date(),
        });
        console.log(`Purchase record created for photoId: ${item._id}`);
      } catch (dbError) {
        console.error("Error creating Purchase record:", dbError);
        // Optionally, send an error response here or set a flag
      }
    }

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.get("/success", async (req, res) => {
  const sessionId = req.query.session_id;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Optionally, you can log session details for your records
    console.log("Stripe Session Retrieved:", session); // Good for debugging

    res.redirect("http://localhost:5173/success"); // Redirect to the success page
  } catch (error) {
    console.error("Error handling successful payment:", error);
    res.status(500).json({ message: "Error handling successful payment" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

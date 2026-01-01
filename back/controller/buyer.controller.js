import Purchase from "../model/purchase.model.js";

export const getPurchasedImages = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user is populated by the auth middleware

        // Find all purchases made by the user
        const purchases = await Purchase.find({ userId: userId }).populate("photoId");

        const purchasedDetails = purchases.map(purchase => ({
            _id: purchase._id, // Include the purchase record ID
            src: purchase.src || (purchase.photoId ? purchase.photoId.src : null), // Use embedded src if available, else from populated Photo
            title: purchase.title || (purchase.photoId ? purchase.photoId.title : null),
            description: purchase.description || (purchase.photoId ? purchase.photoId.description : null),
            category: purchase.category || (purchase.photoId ? purchase.photoId.category : null),
            price: purchase.price,
            purchaseDate: purchase.purchaseDate,
        }));

        res.json(purchasedDetails);
    } catch (error) {
        console.error("Error fetching purchased images:", error);
        res.status(500).json({ message: "Failed to fetch purchased images" });
    }
};
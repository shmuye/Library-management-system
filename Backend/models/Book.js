// Backend/models/Book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        author: {
            type: String,
            required: [true, "Author is required"],
        },
        genre: {
            type: String,
        },
        description: {
            type: String,
        },
        availableCopies: {
            type: Number,
            required: true,
            default: 1,
        },
        coverImage: {
            type: String, // URL (Cloudinary, local, etc.)
        },
        ratings: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, min: 1, max: 5 },
            },
        ],
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;

// Backend/models/BorrowRecord.js
import mongoose from "mongoose";

const borrowRecordSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },
        borrowDate: {
            type: Date,
            default: Date.now,
        },
        returnDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["Borrowed", "Returned"],
            default: "Borrowed",
        },
    },
    { timestamps: true }
);

const BorrowRecord = mongoose.model("BorrowRecord", borrowRecordSchema);
export default BorrowRecord;

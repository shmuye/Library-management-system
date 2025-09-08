import { z } from "zod";

export const borrowSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    bookId: z.string().min(1, "Book ID is required"),
});

export const returnSchema = z.object({
    borrowId: z.string().min(1, "Borrow record ID is required"),
});

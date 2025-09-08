import { z } from "zod";

export const bookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.string().optional(),
    description: z.string().optional(),
    availableCopies: z.number().min(0, "Available copies cannot be negative"),
    coverImage: z.url("Cover image must be a valid URL").optional(),
});

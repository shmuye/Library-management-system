
import express from "express";
import { signup, login, logout, changePassword, refresh } from "../controllers/authController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { signupSchema, loginSchema, changePasswordSchema } from "../validators/userValidation.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", validateRequest(signupSchema), signup);
router.post("/login", validateRequest(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", protect, logout);
router.put("/change-password", protect, validateRequest(changePasswordSchema), changePassword);

export default router;

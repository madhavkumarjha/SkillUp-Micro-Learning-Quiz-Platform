import express from "express";
import {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  uploadProfilePicture,
  getUserProfile,
  changeUserPassword,
  updateUserDetails,
} from "../controllers/auth.controller.js";
import { allowAdmin, authenticate } from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/register", registerUser, authenticate, allowAdmin);
router.patch(
  "/profile/:userId",
  authenticate,
  upload.single("file"),
  uploadProfilePicture
);
router.patch(
  "/change-password/:userId",
  authenticate,
  changeUserPassword
);
router.patch(
  "/update/profile/:userId",
  authenticate,
  updateUserDetails
);

router.get("/profile/:userId", authenticate, getUserProfile);
router.post("/login", loginUser);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);

export default router;

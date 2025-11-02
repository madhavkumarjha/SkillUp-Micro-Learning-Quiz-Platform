import express from "express";
import {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { allowAdmin, authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser, authenticate, allowAdmin);
router.post("/login", loginUser);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);

export default router;

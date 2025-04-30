import express from "express";
import {
  checkAuth,
  loginController,
  logoutController,
  signupController,
  updateProfile,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMIddleware.js";

const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;

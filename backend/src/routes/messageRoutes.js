import express from "express";
import { protectRoute } from "../middleware/authMIddleware.js";
import { getUsers } from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", protectRoute, getUsers);

export default router;

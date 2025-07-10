import express from "express";
import { login } from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/api/auth/login", login); // Changed from /api/login to /api/auth/login

export default router;

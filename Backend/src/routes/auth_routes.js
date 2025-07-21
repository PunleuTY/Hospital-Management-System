import express from "express";
import { login } from "../controllers/auth_controller.js";
import { userLoginValidate } from "../middlewares/validate_middleware.js";

const router = express.Router();

router.post("/login", userLoginValidate, login); // Changed from /api/login to /api/auth/login

export default router;

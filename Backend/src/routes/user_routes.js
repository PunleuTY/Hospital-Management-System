import express from "express";
import {
  createUser,
  getUserSummarize,
} from "../controllers/user_controller.js";
const router = express.Router();

router.get("/api/users/summarize", getUserSummarize);
router.post("/api/users", createUser);

export default router;

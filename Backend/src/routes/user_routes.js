import express from "express";
import {
  createUser,
  getUserSummarize,
  getAllUsers,
} from "../controllers/user_controller.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/summarize", getUserSummarize);
router.post("/", createUser);

export default router;

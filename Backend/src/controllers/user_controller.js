import User from "../../db/models/user.js";
import {
  findUser,
  createUserSv,
  getUserStatistics,
  getAllUsersSv,
} from "../services/user_service.js";
import bcrypt from "bcrypt";
import { success, fail } from "../utils/response.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersSv();
    return success(res, users);
  } catch (err) {
    console.error("Error getting all users:", err);
    return fail(res, err);
  }
};

export const getUserSummarize = async (req, res) => {
  try {
    const statistics = await getUserStatistics();
    return success(res, statistics);
  } catch (err) {
    console.error("Error getting user statistics:", err);
    return fail(res, err);
  }
};

export const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({
      message: "Username, password, and role are required",
    });
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({
      message: "Username and password must be strings",
    });
  }

  try {
    const existingUser = await findUser(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
      roleId: role,
    };

    await createUserSv(newUser);

    return success(res, { message: "User Created Successfully" }, 201);
  } catch (err) {
    console.error("Error creating user:", err);
    return fail(res, err);
  }
};

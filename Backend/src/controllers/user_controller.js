import User from "../../db/models/user.js";
import {
  findUser,
  createUserSv,
  getUserStatistics,
} from "../services/user_service.js";
import bcrypt from "bcrypt";
import { success, fail } from "../utils/response.js";

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
  console.log(req.body);
  const { username, password, role } = req.body;
  console.log(username, password, role);

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

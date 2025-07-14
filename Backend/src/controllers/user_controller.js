import User from "../../db/models/user.js";
import { findUser, createUserSv, listUsers } from "../services/user_service.js";
import bcrypt from "bcrypt";
import { success, fail } from "../utils/response.js";

export const createUser = async (req, res) => {
  console.log(req.body);
  const { username, password, role } = req.body;
  console.log(username, password, role);
  const roles = {
    2: "doctor",
    3: "nurse",
    4: "receptionist",
  };

  // if (req.user.role !== "admin") {
  //   return res.status(403).json({ message: "Forbidden" });
  // }

  try {
    const existingUser = await findUser(username);

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      roleId: role,
    });

    return success(res, newUser, 201);
  } catch (err) {
    console.error("Error creating user:", err);
    return fail(res, err);
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await listUsers();
    return success(res, users, 200);
  } catch (err) {
    console.error("Error fetching users:", err);
    return fail(res, "Failed to fetch users");
  }
};

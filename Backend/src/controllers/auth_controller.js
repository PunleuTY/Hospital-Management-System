import User from "../../db/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { success, fail } from "../utils/response.js";
import { findUser } from "../services/user_service.js";
import "../../config.js";

const { JWT_SECRET } = process.env;

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUser(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return fail(res, "Incorrect password", 401);
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        role_id: user.role_id,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const userRole = user ? user.role : {};

    return success(res, { token, userRole }, 200);
  } catch (err) {
    console.error("Login error:", err);
    return fail(res, err);
  }
};

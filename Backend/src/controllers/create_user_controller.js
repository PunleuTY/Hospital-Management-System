import User from "../../db/models/user.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  const roles = ["nurse", "receptionist", "doctor"];

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: role.toLowerCase(),
    });

    res.status(201).json({ message: "User Created Suffessfully", newUser: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

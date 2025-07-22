// Import model and library
import User from "../../db/models/user.js";
import bcrypt from "bcrypt";

// Create user controller
export const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  const roles = ["nurse", "receptionist", "doctor"];

  // Only admin can create users
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: role.toLowerCase(),
    });

    // Return success response
    res
      .status(201)
      .json({ message: "User Created Suffessfully", newUser: newUser });
  } catch (err) {
    // Handle error
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

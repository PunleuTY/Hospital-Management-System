import db from "../../db/models/index.js";
const { User, Role } = db;

// Find user with role information
export const findUser = (username) => {
  return User.findOne({
    where: { username },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["role_id", "role_name"], // Only get specific fields
      },
    ],
  });
};

// Find user by ID with role
export const findUserById = (id) => {
  return User.findByPk(id, {
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["role_id", "role_name"],
      },
    ],
  });
};

// Get all users with roles
export const listUsers = async () => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["role_id", "role_name"],
        },
      ],
      attributes: { exclude: ["password"] }, // Don't return passwords
      order: [["user_id", "ASC"]],
    });

    return users;
  } catch (error) {
    console.error("Error in listUsers:", error);
    throw error;
  }
};

export const createUserSv = async (data) => {
  return User.create(data);
};

// Update user
export const updateUserSv = async (id, data) => {
  return User.update(data, { where: { userId: id } });
};

// Delete user
export const deleteUserSv = async (id) => {
  return User.destroy({ where: { userId: id } });
};

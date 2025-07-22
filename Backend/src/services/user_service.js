import db from "../../db/models/index.js";
const { User, Role, sequelize } = db;

// Find user with role information
export const findUser = (username) => {
  console.log("user: ", username);
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
export const getAllUsers = async () => {
  try {
    return await User.findAll({
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["role_id", "role_name"],
        },
      ],
      attributes: { exclude: ["password"] },
      order: [["user_id", "ASC"]],
    });
  } catch (error) {
    console.error("Error in listUsers:", error);
    throw error;
  }
};

export const getUsersByRole = async () => {
  try {
    return await User.findAll({
      attributes: [
        // Fix: Use the correct table alias "Users" instead of "User"
        [sequelize.fn("COUNT", sequelize.col("Users.user_id")), "userCount"],
      ],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["role_id", "role_name"],
        },
      ],
      group: ["role.role_id", "role.role_name"],
      order: [["role", "role_name", "ASC"]],
    });
  } catch (error) {
    console.error("Error in getUsersByRole:", error);
    throw error;
  }
};

// Fixed version of getUserStatistics
export const getUserStatistics = async () => {
  try {
    // Get total users
    const totalUsers = await User.count();

    // Get users by role with correct column reference
    const usersByRole = await User.findAll({
      attributes: [
        // Fix: Use "Users.user_id" to match the table alias
        [sequelize.fn("COUNT", sequelize.col("Users.user_id")), "userCount"],
      ],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["role_id", "role_name"],
        },
      ],
      group: ["role.role_id", "role.role_name"],
      order: [["role", "role_name", "ASC"]],
    });

    // Format the response
    const roleStatistics = usersByRole.map((item) => ({
      roleId: item.role.role_id,
      roleName: item.role.role_name,
      userCount: parseInt(item.dataValues.userCount),
    }));

    return {
      totalUsers,
      roleStatistics,
    };
  } catch (error) {
    console.error("Error in getUserStatistics:", error);
    throw error;
  }
};

export const createUserSv = async (data) => {
  return User.create(data);
};

// Update user
export const updateUserSv = async (id, data) => {
  return User.update(data, { where: { user_id: id } });
};

// Delete user
export const deleteUserSv = async (id) => {
  return User.destroy({ where: { user_id: id } });
};

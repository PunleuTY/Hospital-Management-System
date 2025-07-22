import db from "../../db/models/index.js";
const { User, Role, sequelize } = db;

// Find user by username, include role info
export const findUser = (username) => {
  console.log("user: ", username);
  return User.findOne({
    where: { username },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["role_id", "role_name"],
      },
    ],
  });
};

// Find user by ID, include role info
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

// Get all users with role info, exclude password, ordered by user_id
export const getAllUsersSv = async () => {
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
    console.error("Error in getAllUsersSv:", error);
    throw error;
  }
};

// Get count of users grouped by role
export const getUsersByRole = async () => {
  try {
    return await User.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("User.user_id")), "userCount"],
      ],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["role_id", "role_name"],
        },
      ],
      group: ["role.role_id", "role.role_name"],
      order: [[sequelize.col("role.role_name"), "ASC"]],
    });
  } catch (error) {
    console.error("Error in getUsersByRole:", error);
    throw error;
  }
};

// Get total user count and users grouped by role with counts formatted
export const getUserStatistics = async () => {
  try {
    const totalUsers = await User.count();

    const usersByRole = await User.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("user_id")), "userCount"],
      ],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["role_id", "role_name"],
        },
      ],
      group: ["role.role_id", "role.role_name"],
      order: [[sequelize.col("role.role_name"), "ASC"]],
    });

    const roleStatistics = usersByRole.map((user) => ({
      roleId: user.get("role").get("role_id"),
      roleName: user.get("role").get("role_name"),
      userCount: parseInt(user.get("userCount")),
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

// Create a new user
export const createUserSv = async (data) => {
  return User.create(data);
};

// Update user by ID
export const updateUserSv = async (id, data) => {
  return User.update(data, { where: { user_id: id } });
};

// Delete user by ID
export const deleteUserSv = async (id) => {
  return User.destroy({ where: { user_id: id } });
};

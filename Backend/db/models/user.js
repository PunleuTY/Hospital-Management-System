import sequelize from "../config/db_config.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "Users",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "user_id",
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "username",
    },
    password: {
      // Hash Password
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "role_id",
    },
  },
  {
    tableName: "users",
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    createdAt: false,
    updatedAt: "last_modified",
  }
);

User.associate = (models) => {
  User.belongsTo(models.Role, {
    foreignKey: "role_id",
    as: "role",
  });
};

export default User;

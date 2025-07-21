export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
        type: DataTypes.STRING,
        allowNull: false,
        field: "password",
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      onDelete: "SET NULL",
      as: "role",
    });
  };

  return User;
};

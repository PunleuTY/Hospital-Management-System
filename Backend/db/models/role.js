export default (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "role",
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      createdAt: false,
      updatedAt: "last_modified",
    }
  );

  // Define associations
  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: "role_id",
      as: "users",
    });
  };
  return Role;
};

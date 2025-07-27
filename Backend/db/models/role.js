export default (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "role_id",
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "role_name",
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

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: "roleId",
      as: "users",
    });
  };

  return Role;
};

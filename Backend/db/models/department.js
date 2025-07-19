export default (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      departmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "department_id",
      },
      departmentName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "department_name",
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "location",
      },
    },
    {
      tableName: "department",
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      createdAt: false,
      updatedAt: "last_modified",
    }
  );
  Department.associate = (models) => {
    // one-to-many: Department → Staff
    Department.hasMany(models.Staff, {
      foreignKey: "department_id",
      as: "staff",
      onDelete: "SET NULL",
    });
  };
  return Department;
};

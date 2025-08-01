export default (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    "Staff",
    {
      staffId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "staff_id",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name",
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "department_id",
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "doctor_id",
      },
    },
    {
      tableName: "staff",
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      createdAt: false,
      updatedAt: "last_modified",
    }
  );
  Staff.associate = (models) => {
    Staff.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "department",
      onDelete: "SET NULL",
    });
    Staff.belongsTo(models.Staff, {
      foreignKey: "doctor_id",
      as: "supervisor",
      onDelete: "SET NULL",
    });
    Staff.hasMany(models.Staff, {
      foreignKey: "doctor_id",
      as: "team",
    });
    Staff.belongsToMany(models.Patient, {
      through: "patient_doctor",
      foreignKey: "staff_id",
      otherKey: "patient_id",
      as: "patients",
      onDelete: "SET NULL",
    });
    Staff.hasMany(models.Appointment, {
      foreignKey: "doctor_id",
      as: "appointments",
    });
    Staff.hasMany(models.Billing, {
      foreignKey: "receptionistId",
      as: "billings",
    });
  };

  return Staff;
};

export default (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      appointmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "appointment_id",
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "date_time",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Not Completed", // Default status
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "doctor_id",
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "patient_id",
      },
    },
    {
      tableName: "appointment",
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
      updatedAt: "last_modified",
    }
  );

  // Association
  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Patient, {
      foreignKey: "patient_id",
      as: "patient",
      onDelete: "SET NULL",
    });
    Appointment.belongsTo(models.Staff, {
      foreignKey: "doctorId",
      as: "doctor",
      onDelete: "SET NULL",
    });
  };
  return Appointment;
};

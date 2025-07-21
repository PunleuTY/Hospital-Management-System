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
        allowNull: false,
        field: "doctor_id",
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    });
    Appointment.belongsTo(models.Staff, {
      foreignKey: "doctor_id",
      as: "doctor",
    });
  };
    return Appointment;
};
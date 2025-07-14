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
      underscored: true,
    }
  );

  // Association
  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
    });
    Appointment.belongsTo(models.Staff, {
      foreignKey: "doctorId",
      as: "doctor",
    });
    Appointment.hasMany(models.Medical_record, {
      foreignKey: "appointmentId",
      as: "medicalRecords",
    });
  };

  return Appointment;
};

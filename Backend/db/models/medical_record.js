export default (sequelize, DataTypes) => {
  const Medical_record = sequelize.define(
    "Medical_record",
    {
      recordId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "record_id",
      },
      prescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      diagnosis: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      labResult: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "lab_result",
      },
      treatment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "patient_id",
      },
      appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "appointment_id",
      },
    },
    {
      tableName: "medical_record",
      freezeTableName: true,
      underscored: true,
      timestamp: true,
      createdAt: false,
      updatedAt: "last_modified",
    }
  );

  Medical_record.associate = (models) => {
    Medical_record.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "SET NULL",
    });
    Medical_record.belongsTo(models.Appointment, {
      foreignKey: "appointmentId",
      as: "appointment",
      onDelete: "SET NULL",
    });
  };
  return Medical_record;
};

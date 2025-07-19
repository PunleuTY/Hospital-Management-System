export default (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    "Patient",
    {
      patientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "patient_id", // maps JS `patientId` → DB `patient_id`
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name", // maps `firstName` → `first_name`
      },
      height: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        field: "height", // maps `height` → `height`
      },
      weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        field: "weight", // maps `weight` → `weight`
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "date_of_birth", // maps `dateOfBirth` → `date_of_birth
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "address", // maps `address` → `address`
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "contact", // maps `contact` → `contact`
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true, // validate email format
        },
        field: "email", // maps `email` → `email`
      },
    },
    {
      tableName: "patient", // use the patient table in database
      freezeTableName: true, // keep the table name as is
      underscored: true, // automatically snake_case JS attributes
      timestamps: true,
      createdAt: false, // disable createdAt
      updatedAt: "last_modified", // write into the last_modified column
    }
  );
  Patient.associate = (models) => {
    // many-to-many: Patient ↔ Staff through patient_doctor
    Patient.belongsToMany(models.Staff, {
      through: "patient_doctor",
      foreignKey: "patient_id",
      otherKey: "doctor_id",
      as: "doctors",
    });

    // one-to-many: Patient → Appointment
    Patient.hasMany(models.Appointment, {
      foreignKey: "patient_id",
      as: "appointments",
      onDelete: "SET NULL",
    });

    // one-to-many: Patient → Medical_record
    Patient.hasMany(models.Medical_record, {
      foreignKey: "patient_id",
      as: "medicalRecords",
      onDelete: "SET NULL",
    });

    // one-to-many: Patient → Billing
    Patient.hasMany(models.Billing, {
      foreignKey: "patient_id",
      as: "billings",
      onDelete: "SET NULL",
    });
  };

  return Patient;
};

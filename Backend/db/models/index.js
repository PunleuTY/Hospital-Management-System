import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db_config.js";

// Import model definition functions
import defineAppointment from "./appointment.js";
import defineMedicalRecord from "./medical_record.js";
import definePatient from "./patient.js";
import defineStaff from "./staff.js";
import defineBilling from "./billing.js";
import defineDepartment from "./department.js";
import defineUser from "./user.js";
import defineRole from "./role.js";

// Initialize models with sequelize and DataTypes
const Appointment = defineAppointment(sequelize, DataTypes);
const Medical_record = defineMedicalRecord(sequelize, DataTypes);
const Patient = definePatient(sequelize, DataTypes);
const Staff = defineStaff(sequelize, DataTypes);
const Billing = defineBilling(sequelize, DataTypes);
const Department = defineDepartment(sequelize, DataTypes);
const User = defineUser(sequelize, DataTypes);
const Role = defineRole(sequelize, DataTypes);

const models = {
  Appointment,
  Medical_record,
  Patient,
  Staff,
  Billing,
  Department,
  Role,
  User,
};

// Set up associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;

import db from "../../db/models/index.js";
const { Patient, Staff, Appointment, Medical_record, Billing } = db;

// List patients with pagination; include their doctors (no junction attrs)
export const listPatients = async ({ limit, offset }) =>
  Patient.findAndCountAll({
    limit,
    offset,
    order: [["patientId", "ASC"]],
    include: [
      {
        model: Staff,
        as: "doctors",
        attributes: ["staffId", "firstName", "lastName", "specialization"],
        through: { attributes: [] },
      },
    ],
  });

// Find patient by ID including their doctors
export const findPatientById = async (id) =>
  Patient.findByPk(id, {
    include: [
      {
        model: Staff,
        as: "doctors",
        attributes: ["staffId", "firstName", "lastName", "specialization"],
        through: { attributes: [] },
      },
    ],
  });

// Create a new patient
export const createPatientSv = async (patientData) =>
  Patient.create(patientData);

// Update patient data by ID
export const updatePatientSv = async (id, patientData) =>
  Patient.update(patientData, { where: { patientId: id } });

// Delete patient and all related records (appointments, medical records, billing)
export const deletePatientSv = async (id) => {
  await Appointment.destroy({ where: { patientId: id } });
  await Medical_record.destroy({ where: { patientId: id } });
  await Billing.destroy({ where: { patientId: id } });
  return Patient.destroy({ where: { patientId: id } });
};

// Get array of all patient IDs
export const getAllPatientId = async () => {
  const patientsId = await Patient.findAll({ attributes: ["patientId"] });
  return patientsId.map((patient) => patient.get("patientId"));
};

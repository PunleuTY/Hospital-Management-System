import db from "../../db/models/index.js";
const { Patient, Staff, Appointment, Medical_record, Billing } = db;

export const listPatients = async ({ limit, offset }) => {
  return Patient.findAndCountAll({
    limit,
    offset,
    order: [["patientId", "ASC"]],
    include: [
      {
        model: Staff,
        as: "doctors",
        attributes: ["staffId", "firstName", "lastName", "specialization"],
        through: { attributes: [] }, // Don't include junction table attributes
      },
    ],
  });
};

export const findPatientById = async (id) => {
  return Patient.findByPk(id, {
    include: [
      {
        model: Staff,
        as: "doctors",
        attributes: ["staffId", "firstName", "lastName", "specialization"],
        through: { attributes: [] }, // Don't include junction table attributes
      },
    ],
  });
};
export const createPatientSv = async (patientData) => {
  return Patient.create(patientData);
};

export const updatePatientSv = async (id, patientData) => {
  return Patient.update(patientData, { where: { patientId: id } });
};

export const deletePatientSv = async (id) => {
  // 1) delete dependents
  await Appointment.destroy({ where: { patientId: id } });
  await Medical_record.destroy({ where: { patientId: id } });
  await Billing.destroy({ where: { patientId: id } });

  // 2) delete the patient
  return Patient.destroy({ where: { patientId: id } });
};

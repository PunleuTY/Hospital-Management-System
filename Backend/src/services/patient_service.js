import db from "../../db/models/index.js";
const { Patient } = db;

export const listPatients = async () => {
  return Patient.findAndCountAll({
    order: [["patient_id", "ASC"]],
  });
};

export const findPatientById = async (id) => {
  return Patient.findByPk(id);
};
export const createPatientSv = async (patientData) => {
  return Patient.create(patientData);
};

export const updatePatientSv = async (id, patientData) => {
  return Patient.update(patientData, { where: { id } });
};

export const deletePatientSv = async (id) => {
  return Patient.destroy({ where: { id } });
};

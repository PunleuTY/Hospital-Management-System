import db from "../../db/models/index.js";
const { Medical_record, Patient, Appointment } = db;

export const listMedicalRecords = async ({ limit, offset }) =>
  Medical_record.findAndCountAll({
    attributes: [
      "recordId",
      "patientId",
      "appointmentId",
      "diagnosis",
      "prescription",
      "labResult",
      "treatment",
    ],
    order: [["recordId", "ASC"]],
    limit,
    offset,
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["patientId", "firstName", "lastName"],
      },
      {
        model: Appointment,
        as: "appointment",
        attributes: ["appointmentId", "dateTime", "status"],
      },
    ],
  });

export const findMedicalRecordById = async (id) =>
  Medical_record.findByPk(id, {
    attributes: [
      "recordId",
      "patientId",
      "appointmentId",
      "diagnosis",
      "prescription",
      "labResult",
      "treatment",
    ],
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["patientId", "firstName", "lastName"],
      },
      {
        model: Appointment,
        as: "appointment",
        attributes: ["appointmentId", "dateTime", "status"],
      },
    ],
  });

export const createMedicalRecordSv = async (data) => {
  return await Medical_record.create(data);
};
export const updateMedicalRecordSv = async (id, data) => {
  return await Medical_record.update(data, {
    where: { record_id: id },
  });
};
export const deleteMedicalRecordSv = async (id) => {
  return await Medical_record.destroy({
    where: { recordId: id },
  });
};

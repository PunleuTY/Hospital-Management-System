import db from "../../db/models/index.js";
const { Medical_record, Patient, Appointment } = db;
const resetMedicalRecordSeq = `
  SELECT setval(
    pg_get_serial_sequence('medical_record','record_id'),
    (SELECT COALESCE(MAX(record_id),0) FROM medical_record) + 1,
    false
  );
`;
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
  const { recordId, ...cleanData } = data;
  const record = await Medical_record.create(cleanData);

  await Medical_record.sequelize.query(resetMedicalRecordSeq);

  return record;
};

export const updateMedicalRecordSv = async (id, data) => {
  return await Medical_record.update(data, {
    where: { recordId: id },
  });
};
export const deleteMedicalRecordSv = async (id) => {
  return await Medical_record.destroy({
    where: { recordId: id },
  });
};
export const getAllPatientsForDropdownSv = async () => {
  return await Patient.findAll({
    attributes: ["patientId", "firstName", "lastName"],
  });
};

export const getAllAppointmentsForDropdownSv = async () => {
  return await Appointment.findAll({
    attributes: ["appointmentId"],
  });
};

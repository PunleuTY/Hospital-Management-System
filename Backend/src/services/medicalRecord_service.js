import db from "../../db/models/index.js";
const { Medical_record, Patient, Appointment } = db;

// Reset serial sequence for medical_record table
const resetMedicalRecordSeq = `
  SELECT setval(
    pg_get_serial_sequence('medical_record', 'record_id'),
    (SELECT COALESCE(MAX(record_id), 0) FROM medical_record) + 1,
    false
  );
`;

// List medical records with pagination, including patient and appointment info
export const listMedicalRecords = ({ limit, offset }) =>
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

// Find one medical record by ID with related patient and appointment
export const findMedicalRecordById = (id) =>
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

// Create a new medical record; reset sequence to avoid conflicts
export const createMedicalRecordSv = async (data) => {
  const { recordId, ...cleanData } = data;
  const record = await Medical_record.create(cleanData);
  await Medical_record.sequelize.query(resetMedicalRecordSeq);
  return record;
};

// Update medical record by ID
export const updateMedicalRecordSv = (id, data) =>
  Medical_record.update(data, { where: { recordId: id } });

// Delete medical record by ID
export const deleteMedicalRecordSv = (id) =>
  Medical_record.destroy({ where: { recordId: id } });

// Get all patients for dropdown (minimal info)
export const getAllPatientsForDropdownSv = () =>
  Patient.findAll({ attributes: ["patientId", "firstName", "lastName"] });

// Get all appointments for dropdown (only IDs)
export const getAllAppointmentsForDropdownSv = () =>
  Appointment.findAll({ attributes: ["appointmentId"] });

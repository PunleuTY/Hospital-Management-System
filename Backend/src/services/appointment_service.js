import db from "../../db/models/index.js";

const { Appointment, Patient, Staff, Medical_record, Sequelize, sequelize } =
  db;
const { Op } = Sequelize;

// List all appointments with pagination and related patient & doctor info
export const listAllAppointments = async ({ limit, offset }) => {
  return Appointment.findAndCountAll({
    attributes: [
      "appointmentId",
      "patientId",
      "doctorId",
      "dateTime",
      "status",
      "purpose",
    ],
    order: [["appointmentId", "ASC"]],
    limit,
    offset,
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["patientId", "firstName", "lastName"],
      },
      {
        model: Staff,
        as: "doctor",
        attributes: ["staffId", "firstName", "lastName"],
      },
    ],
  });
};

// Find a single appointment by ID including patient and doctor
export const findAppointmentById = async (id) => {
  return Appointment.findByPk(id, {
    attributes: [
      "appointmentId",
      "patientId",
      "doctorId",
      "dateTime",
      "purpose",
      "status",
    ],
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["patientId", "firstName", "lastName"],
      },
      {
        model: Staff,
        as: "doctor",
        attributes: ["staffId", "firstName", "lastName"],
      },
    ],
  });
};

// Create a new appointment
export const createAppointmentSv = async (data) => Appointment.create(data);

// Update appointment by ID
export const updateAppointmentSv = async (id, data) =>
  Appointment.update(data, { where: { appointmentId: id } });

// Delete appointment and its related medical records transactionally
export const deleteAppointmentSv = async (id) => {
  return sequelize.transaction(async (t) => {
    await Medical_record.destroy({
      where: { appointmentId: id },
      transaction: t,
    });
    return Appointment.destroy({
      where: { appointmentId: id },
      transaction: t,
    });
  });
};

// Get upcoming scheduled appointments (next 10)
export const getUpcomingScheduledAppointments = async () => {
  return Appointment.findAll({
    attributes: [
      "appointmentId",
      "patientId",
      "doctorId",
      "dateTime",
      "purpose",
      "status",
    ],
    where: {
      status: "Scheduled",
      dateTime: {
        [Op.gte]: new Date(),
      },
    },
    order: [["dateTime", "ASC"]],
    limit: 10,
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["patientId", "firstName", "lastName"],
      },
      {
        model: Staff,
        as: "doctor",
        attributes: ["staffId", "firstName", "lastName"],
      },
    ],
  });
};

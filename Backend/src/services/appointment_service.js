import db from "../../db/models/index.js";
const { Appointment, Patient, Staff, Medical_record } = db;

export const listAllAppointments = async ({ limit, offset }) => {
  return Appointment.findAndCountAll({
    // only these six columns from appointment:
    attributes: [
      "appointmentId",
      "patientId",
      "doctorId",
      "dateTime",
      "status",
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

export const findAppointmentById = async (id) => {
  return Appointment.findByPk(id, {
    attributes: [
      "appointmentId",
      "patientId",
      "doctorId",
      "dateTime",
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

export const createAppointmentSv = async (data) => Appointment.create(data);

export const updateAppointmentSv = async (id, data) =>
  Appointment.update(data, { where: { appointmentId: id } });

export const deleteAppointmentSv = async (id) => {
  // 1) delete medical records
  await Medical_record.destroy({ where: { appointmentId: id } });
  // 2) delete the appointment
  return Appointment.destroy({ where: { appointmentId: id } });
};

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
      status: "scheduled",
      dateTime: {
        [db.Sequelize.Op.gte]: new Date(), // Only future appointments
      },
    },
    order: [["dateTime", "ASC"]], // Order by appointment time
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

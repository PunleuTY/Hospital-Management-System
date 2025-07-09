import db from "../../db/models/index.js";
const { Appointment } = db;

export const listAllAppointments = async () => {
  Appointment.findAndCountAll({
    limit,
    offset,
    order: [["appointment_id", "ASC"]],
  });
};
export const findAppointmentById = async (id) => Appointment.findByPk(id);

export const createAppointmentSv = async (data) => Appointment.create(data);

export const updateAppointmentSv = async (id, data) =>
  Appointment.update(data, { where: { appointmentId: id } });

export const deleteAppointmentSv = async (id) =>
  Appointment.destroy({ where: { appointmentId: id } });

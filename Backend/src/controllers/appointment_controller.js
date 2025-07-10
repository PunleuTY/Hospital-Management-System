import {
  listAllAppointments,
  createAppointmentSv,
  updateAppointmentSv,
  deleteAppointmentSv,
} from "../services/appointment_service.js";
import { success, fail } from "../utils/response.js";

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await listAllAppointments();
    return success(res, appointments);
  } catch (err) {
    return fail(res, err);
  }
};
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await findAppointmentById(req.params.id);
    if (!appointment)
      return res.status(404).json({ status: "error", message: "Not Found" });
    return success(res, appt);
  } catch (err) {
    return fail(res, err);
  }
};
export const createAppointment = async (req, res) => {
  try {
    const appointment = await createAppointmentSv(req.body);
    return success(res, appointment, 201);
  } catch (err) {
    return fail(res, err);
  }
};
export const updateAppointment = async (req, res) => {
  try {
    const [rows] = await updateAppointmentSv(req.params.id, req.body);
    if (rows === 0)
      return res.status(404).json({ status: "error", message: "Not Found" });
    return success(res, { updated: rows });
  } catch (err) {
    return fail(res, err);
  }
};
export const deleteAppointment = async (req, res) => {
  try {
    const rows = await deleteAppointmentSv(req.params.id);
    if (rows === 0)
      return res.status(404).json({ status: "error", message: "Not Found" });
    return success(res, { deleted: rows });
  } catch (err) {
    return fail(res, err);
  }
};

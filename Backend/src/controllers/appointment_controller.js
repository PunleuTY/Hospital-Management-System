import {
  listAllAppointments,
  createAppointmentSv,
  updateAppointmentSv,
  deleteAppointmentSv,
  findAppointmentById,
  getUpcomingScheduledAppointments,
} from "../services/appointment_service.js";
import { success, fail } from "../utils/response.js";

export const getAllAppointments = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const offset = (page - 1) * limit;
  try {
    const { rows, count } = await listAllAppointments({ limit, offset });
    const totalPages = Math.ceil(count / limit);
    return success(res, {
      data: rows,
      meta: { total: count, page, limit, totalPages },
    });
  } catch (err) {
    console.error("getAllAppointments error:", err);
    return fail(res, err);
  }
};
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await findAppointmentById(req.params.id);
    if (!appointment)
      return res.status(404).json({ status: "error", message: "Not Found" });
    return success(res, appointment);
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
export const getUpcomingAppointments = async (req, res) => {
  try {
    const appointments = await getUpcomingScheduledAppointments();
    return success(res, {
      data: appointments,
      meta: {
        total: appointments.length,
        limit: 10,
        status: "scheduled",
        type: "upcoming",
      },
    });
  } catch (err) {
    console.error("getUpcomingAppointments error:", err);
    return fail(res, err);
  }
};

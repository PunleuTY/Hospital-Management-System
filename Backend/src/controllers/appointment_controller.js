import db from "../../db/models/index.js";
const { Appointment } = db;

import {
  listAllAppointments,
  createAppointmentSv,
  updateAppointmentSv,
  deleteAppointmentSv,
  findAppointmentById,
  getUpcomingScheduledAppointments,
} from "../services/appointment_service.js";

import { success, fail } from "../utils/response.js";

// Get all appointments with pagination
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

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await findAppointmentById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
    return success(res, appointment);
  } catch (err) {
    return fail(res, err);
  }
};

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const appointment = await createAppointmentSv(req.body);
    return success(res, appointment, 201);
  } catch (err) {
    return fail(res, err);
  }
};

// Update appointment by ID
export const updateAppointment = async (req, res) => {
  try {
    const filteredBody = {};
    for (const key in req.body) {
      if (
        req.body[key] !== "" &&
        req.body[key] !== undefined &&
        req.body[key] !== null
      ) {
        filteredBody[key] = req.body[key];
      }
    }

    const [rows] = await updateAppointmentSv(req.params.id, filteredBody);
    if (rows === 0) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
    return success(res, { updated: rows });
  } catch (err) {
    return fail(res, err);
  }
};

// Delete appointment by ID
export const deleteAppointment = async (req, res) => {
  try {
    const rows = await deleteAppointmentSv(req.params.id);
    if (rows === 0) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
    return success(res, { deleted: rows });
  } catch (err) {
    return fail(res, err);
  }
};

// Get upcoming scheduled appointments
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

// Count total appointments
export const countAppointment = async (req, res) => {
  try {
    const totalAppointment = await Appointment.count();
    return success(res, { total: totalAppointment });
  } catch (err) {
    console.error("Error couting appointment:", err);
    return fail(res, err);
  }
};

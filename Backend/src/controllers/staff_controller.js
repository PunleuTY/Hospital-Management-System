import { success, fail } from "../utils/response.js";
import {
  listAllStaff,
  findStaffById,
  createStaffSv,
  updateStaffSv,
  deleteStaffSv,
  getAllDoctorId,
  getAllReceptionistIds
} from "../services/staff_service.js";


export const allReceptionistId = async (req, res) => {
  try {
    const ids = await getAllReceptionistIds();
    return success(res, { data: ids });
  } catch (err) {
    return fail(res, err);
  }
};

export const getAllStaff = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const offset = (page - 1) * limit;
  try {
    const { rows, count } = await listAllStaff({ limit, offset });
    const totalPages = Math.ceil(count / limit);
    return success(res, {
      data: rows,
      meta: { total: count, page, limit, totalPages },
    });
  } catch (err) {
    return fail(res, err);
  }
};

export const getStaffById = async (req, res) => {
  try {
    const staff = await findStaffById(req.params.id);
    if (!staff) {
      return fail(res, "Staff not found", 404);
    }
    return success(res, staff);
  } catch (err) {
    return fail(res, err);
  }
};

export const createStaff = async (req, res) => {
  try {
    const staff = await createStaffSv(req.body);
    return success(res, staff, 201);
  } catch (err) {
    return fail(res, err);
  }
};

export const updateStaff = async (req, res) => {
  try {
    const [rows] = await updateStaffSv(req.params.id, req.body);
    if (rows === 0) {
      return fail(res, "Staff not found or no changes made", 404);
    }
    return success(res, { updated: rows });
  } catch (err) {
    return fail(res, err);
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const rows = await deleteStaffSv(req.params.id);
    if (rows === 0) {
      return fail(res, "Staff not found", 404);
    }
    return success(res, { deleted: rows });
  } catch (err) {
    return fail(res, err);
  }
};

export const allDoctorId = async (req, res) => {
  try {
    const doctorsId = await getAllDoctorId();
    return success(res, { data: doctorsId });
  } catch (err) {
    console.error("Error fetching doctor IDs:", err);
    return fail(res, err);
  }
};

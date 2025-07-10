import { success, fail } from "../utils/response.js";
import {
  listAllStaff,
  findStaffById,
  createStaffSv,
  updateStaffSv,
  deleteStaffSvc,
} from "../services/staff_service.js";
export const getAllStaff = async (req, res) => {
  try {
    const staffs = await listAllStaff();
    return success(res, staffs);
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
    const rows = await deleteStaffSvc(req.params.id);
    if (rows === 0) {
      return fail(res, "Staff not found", 404);
    }
    return success(res, { deleted: rows });
  } catch (err) {
    return fail(res, err);
  }
};

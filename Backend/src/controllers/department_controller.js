import {
  listDepartments,
  findDepartmentById,
  createDepartmentSv,
  updateDepartmentSv,
  deleteDepartmentSv,
} from "../services/department_service.js";
import { success, fail } from "../utils/response.js";

export const getAllDepartments = async (req, res) => {
  try {
    const depts = await listDepartments();
    return success(res, depts);
  } catch (err) {
    return fail(res, err);
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const dept = await findDepartmentById(req.params.id);
    if (!dept) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
    return success(res, dept);
  } catch (err) {
    return fail(res, err);
  }
};

export const createDepartment = async (req, res) => {
  try {
    const dept = await createDepartmentSv(req.body);
    return success(res, dept, 201);
  } catch (err) {
    return fail(res, err);
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const [rows] = await updateDepartmentSv(req.params.id, req.body);
    if (rows === 0) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
    return success(res, { updated: rows });
  } catch (err) {
    return fail(res, err);
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const rows = await deleteDepartmentSv(req.params.id);
    if (rows === 0) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
    return success(res, { deleted: rows });
  } catch (err) {
    return fail(res, err);
  }
};

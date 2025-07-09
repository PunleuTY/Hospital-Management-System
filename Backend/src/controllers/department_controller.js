import {
  listDepartments,
  findDepartmentById,
  createDepartmentSv,
  updateDepartmentSv,
  deleteDepartmentSv,
} from "../services/department_service.js";
import { success, fail } from "../utils/response.js";

export const getAllDepartments = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
  const offset = (page - 1) * limit;

  try {
    const { rows, count } = await listDepartments({ limit, offset });
    const totalPages = Math.ceil(count / limit);
    return success(res, {
      data: rows,
      meta: { total: count, page, limit, totalPages },
    });
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

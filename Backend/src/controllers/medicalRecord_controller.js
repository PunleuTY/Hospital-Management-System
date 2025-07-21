import {
  listMedicalRecords,
  findMedicalRecordById,
  createMedicalRecordSv,
  updateMedicalRecordSv,
  deleteMedicalRecordSv,
  getAllPatientsForDropdownSv,
  getAllAppointmentsForDropdownSv,
} from "../services/medicalRecord_service.js";
import { success, fail } from "../utils/response.js";

export const getAllMedicalRecords = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const offset = (page - 1) * limit;

  try {
    const { rows, count } = await listMedicalRecords({ limit, offset });
    return success(res, {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (err) {
    console.error("getAllMedicalRecords error:", err);
    return fail(res, err);
  }
};

export const getMedicalRecordById = async (req, res) => {
  try {
    const record = await findMedicalRecordById(req.params.id);
    if (!record) {
      return fail(res, "Medical record not found", 404);
    }
    return success(res, record);
  } catch (err) {
    console.error("getMedicalRecordById error:", err);
    return fail(res, err);
  }
};

export const createMedicalRecord = async (req, res) => {
  try {
    const record = await createMedicalRecordSv(req.body);
    return success(res, record, 201);
  } catch (err) {
    console.error("createMedicalRecord error:", err);
    return fail(res, err);
  }
};

export const updateMedicalRecord = async (req, res) => {
  try {
    const [rows] = await updateMedicalRecordSv(req.params.id, req.body);
    if (rows === 0) {
      return fail(res, "Medical record not found or no changes made", 404);
    }
    const updated = await findMedicalRecordById(req.params.id);
    return success(res, updated);
  } catch (err) {
    console.error("updateMedicalRecord error:", err);
    return fail(res, err);
  }
};

export const deleteMedicalRecord = async (req, res) => {
  try {
    const rows = await deleteMedicalRecordSv(req.params.id);
    if (rows === 0) {
      return fail(res, "Medical record not found", 404);
    }
    return success(res, { deleted: rows });
  } catch (err) {
    console.error("deleteMedicalRecord error:", err);
    return fail(res, err);
  }
};

// Fetch all patients for dropdown
export const getAllPatientsForDropdown = async (req, res) => {
  try {
    const patients = await getAllPatientsForDropdownSv();
    return success(res, { data: patients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return fail(res, "Failed to fetch patients", 500);
  }
};

// Fetch all appointments for dropdown
export const getAllAppointmentsForDropdown = async (req, res) => {
  try {
    const appointments = await getAllAppointmentsForDropdownSv();
    return success(res, { data: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return fail(res, "Failed to fetch appointments", 500);
  }
};

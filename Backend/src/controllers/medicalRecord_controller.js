// Import services and response helpers
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

// Get all medical records with pagination
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

// Get one medical record by ID
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

// Create a new medical record
export const createMedicalRecord = async (req, res) => {
  try {
    const record = await createMedicalRecordSv(req.body);
    return success(res, record, 201);
  } catch (err) {
    console.error("createMedicalRecord error:", err);
    return fail(res, err);
  }
};

// Update a medical record
export const updateMedicalRecord = async (req, res) => {
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

    const [rows] = await updateMedicalRecordSv(req.params.id, filteredBody);
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

// Delete a medical record
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

// Get all patients for dropdown
export const getAllPatientsForDropdown = async (req, res) => {
  try {
    const patients = await getAllPatientsForDropdownSv();
    return success(res, { data: patients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return fail(res, "Failed to fetch patients", 500);
  }
};

// Get all appointments for dropdown
export const getAllAppointmentsForDropdown = async (req, res) => {
  try {
    const appointments = await getAllAppointmentsForDropdownSv();
    return success(res, { data: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return fail(res, "Failed to fetch appointments", 500);
  }
};

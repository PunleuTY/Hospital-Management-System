import { fail, success } from "../utils/response.js";
import {
  listPatients,
  findPatientById,
  createPatientSv,
  updatePatientSv,
  deletePatientSv,
} from "../services/patient_service.js";

// GET /api/patients?page=&limit=
export const getAllPatients = async (req, res) => {
  try {
    const patients = await listPatients();
    return success(res, patients);
  } catch (err) {
    console.error("getAllPatients error:", err);
    return fail(res, err);
  }
};

// GET /api/patients/:id
export const getPatientById = async (req, res) => {
  try {
    const patient = await findPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
    return success(res, patient);
  } catch (err) {
    return fail(res, err);
  }
};

// POST /api/patients
export const createPatient = async (req, res) => {
  try {
    const patient = await createPatientSv(req.body);
    return success(res, patient, 201);
  } catch (err) {
    return fail(res, err);
  }
};

// PUT /api/patients/:id
export const updatePatient = async (req, res) => {
  try {
    const [rows] = await updatePatientSv(req.params.id, req.body);
    if (rows === 0) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
    return success(res, { updated: rows });
  } catch (err) {
    return fail(res, err);
  }
};

// DELETE /api/patients/:id
export const deletePatient = async (req, res) => {
  try {
    const rows = await deletePatientSv(req.params.id);
    if (rows === 0) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
    return success(res, { deleted: rows });
  } catch (err) {
    return fail(res, err);
  }
};

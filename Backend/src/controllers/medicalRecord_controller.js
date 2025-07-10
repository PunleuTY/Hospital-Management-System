import {
  listMedicalRecords,
  createMedicalRecordSv,
  findMedicalRecordById,
} from "../services/medicalRecord_service.js";
import { success, fail } from "../utils/response.js";

export const getAllMedicalRecords = async (req, res) => {
  try {
    const records = await listMedicalRecords();
    return success(res, records);
  } catch (err) {
    return fail(res, err);
  }
};
export const getMedicalRecordById = async (req, res) => {
  try {
    const record = await findMedicalRecordById(req.params.id);
    if (!record) {
      return fail(res, "Medical record not found", 404);
    }
  } catch (err) {
    return fail(res, err);
  }
};
export const createMedicalRecord = async (req, res) => {
  try {
    const record = await createMedicalRecordSv(req.body);
    return success(res, record, 201);
  } catch (err) {
    return fail(res, err);
  }
};
export const updateMedicalRecord = async (req, res) => {
  try {
    const [rows] = await updateMedicalRecordSv(req.params.id, req.body);
    if (rows === 0) {
      return fail(res, "Medical record not found or no changes made", 404);
    }
    return success(res, { updated: rows });
  } catch (err) {
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
    return fail(res, err);
  }
};

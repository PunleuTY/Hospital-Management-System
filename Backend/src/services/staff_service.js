import db from "../../db/models/index.js";
const { Staff, Department, Appointment, Billing } = db;

// List staff with pagination; include department and supervisor info
export const listAllStaff = async ({ limit, offset }) =>
  Staff.findAndCountAll({
    limit,
    offset,
    order: [["staff_id", "ASC"]],
    attributes: [
      "staff_id",
      "first_name",
      "last_name",
      "gender",
      "role",
      "contact",
      "specialization",
      "department_id",
      "doctor_id",
    ],
    include: [
      {
        model: Department,
        as: "department",
        attributes: ["department_id", "department_name"],
      },
      {
        model: Staff,
        as: "supervisor",
        attributes: ["staff_id", "first_name", "last_name"],
      },
    ],
  });

// Find a staff member by ID with department and supervisor info
export const findStaffById = async (id) =>
  Staff.findByPk(id, {
    attributes: [
      "staff_id",
      "first_name",
      "last_name",
      "gender",
      "role",
      "contact",
      "specialization",
      "department_id",
      "doctor_id",
    ],
    include: [
      {
        model: Department,
        as: "department",
        attributes: ["department_id", "department_name"],
      },
      {
        model: Staff,
        as: "supervisor",
        attributes: ["staff_id", "first_name", "last_name"],
      },
    ],
  });

// Create a new staff record
export const createStaffSv = async (data) => Staff.create(data);

// Update a staff record by ID
export const updateStaffSv = async (id, data) =>
  Staff.update(data, { where: { staffId: id } });

// Delete staff and all related appointments and billings
export const deleteStaffSv = async (id) => {
  await Appointment.destroy({ where: { doctorId: id } }); // Remove related appointments
  await Billing.destroy({ where: { receptionistId: id } }); // Remove related billings
  return Staff.destroy({ where: { staffId: id } }); // Delete staff
};

// Get IDs of all staff with role Doctor
export const getAllDoctorId = async () => {
  const doctorsId = await Staff.findAll({
    where: { role: "Doctor" },
    attributes: ["staff_id"],
  });
  return doctorsId.map((d) => d.get("staff_id"));
};

// Get IDs of all staff with role Receptionist
export const getAllReceptionistIds = async () => {
  const receptionistsId = await Staff.findAll({
    where: { role: "Receptionist" },
    attributes: ["staff_id"],
  });
  return receptionistsId.map((r) => r.get("staff_id"));
};

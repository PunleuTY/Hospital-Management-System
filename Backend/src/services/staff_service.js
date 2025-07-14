import db from "../../db/models/index.js";
const { Staff, Department, Appointment, Billing } = db;

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

export const createStaffSv = async (data) => Staff.create(data);

export const updateStaffSv = async (id, data) =>
  Staff.update(data, { where: { staffId: id } });

export const deleteStaffSv = async (id) => {
  // 1) nuke every appointment where this user was the doctor
  await Appointment.destroy({ where: { doctorId: id } });
  // 2) nuke every billing where this user was the receptionist
  await Billing.destroy({ where: { receptionistId: id } });
  // 3) finally delete the staff record itself
  return Staff.destroy({ where: { staffId: id } });
};

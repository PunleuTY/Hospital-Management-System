import db from "../../db/models/index.js";
const { Staff } = db;

export const listAllStaff = async () =>
  Staff.findAndCountAll({ order: [["staff_id", "ASC"]] });

export const findStaffById = async (id) => Staff.findByPk(id);

export const createStaffSv = async (data) => Staff.create(data);

export const updateStaffSv = async (id, data) =>
  Staff.update(data, { where: { staffId: id } });

export const deleteStaffSvc = async (id) =>
  Staff.destroy({ where: { staffId: id } });

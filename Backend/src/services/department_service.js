import db from "../../db/models/index.js";
const { Department } = db;

export const listDepartments = async ({ limit, offset }) =>
  Department.findAndCountAll({
    limit,
    offset,
    order: [["department_id", "ASC"]],
  });

export const findDepartmentById = async (id) => Department.findByPk(id);

export const createDepartmentSv = async (data) => Department.create(data);

export const updateDepartmentSv = async (id, data) =>
  Department.update(data, { where: { departmentId: id } });

export const deleteDepartmentSv = async (id) =>
  Department.destroy({ where: { departmentId: id } });

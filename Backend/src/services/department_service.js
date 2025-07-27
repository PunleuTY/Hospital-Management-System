import db from "../../db/models/index.js";
const { Department } = db;

export const listDepartments = ({ limit, offset }) =>
  Department.findAndCountAll({
    limit,
    offset,
    order: [["department_id", "ASC"]],
  });

export const findDepartmentById = (id) => Department.findByPk(id);

export const createDepartmentSv = (data) => Department.create(data);

export const updateDepartmentSv = (id, data) =>
  Department.update(data, { where: { department_id: id } });

export const deleteDepartmentSv = (id) =>
  Department.destroy({ where: { department_id: id } });

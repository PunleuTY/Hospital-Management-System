import db from "../../db/models/index.js";
const { Medical_record } = db;

export const listMedicalRecords = async ({ limit, offset }) => {
  Medical_record.findAndCountAll({
    limit,
    offset,
    order: [["record_id", "ASC"]],
  });
};

export const findMedicalRecordById = async (id) => {
  Medical_record.findByPk(id);
};

export const createMedicalRecordSv = async (data) => {
  Medical_record.create(data);
};
export const updateMedicalRecordSv = async (id, data) => {
  Medical_record.update(data, {
    where: { record_id: id },
  });
};
export const deleteMedicalRecordSv = async (id) => {
  Medical_record.destroy({
    where: { record_id: id },
  });
};

'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = require('sequelize');
    await queryInterface.createTable('staff', {
      staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: true
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: true
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'department',
          key: 'department_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'staff',
          key: 'staff_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      last_modified: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('staff');
  }
};

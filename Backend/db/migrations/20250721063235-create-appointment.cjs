'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize
    await queryInterface.createTable('appointment', {
      appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date_time: {
        type: DataTypes.DATE,
        allowNull: false 
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
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
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'patient',
          key: 'patient_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      last_modified: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('appointment');
  }
};

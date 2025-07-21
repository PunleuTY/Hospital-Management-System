'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    await queryInterface.createTable('medical_record', {
      record_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      prescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      diagnosis: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lab_result: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      treatment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'patient',      
          key: 'patient_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'appointment',   
          key: 'appointment_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      last_modified: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('medical_record');
  }
};

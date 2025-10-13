'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("tasks",{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      title:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      description:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      status:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      userId:{
        type:Sequelize.INTEGER,
        references:{
          model:"users",
          key:"id"
        },
        onDelete:'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("tasks")
  }
};

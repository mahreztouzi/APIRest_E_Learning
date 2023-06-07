"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contenu: {
        type: Sequelize.STRING,
      },
      idExpediteur: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Nom de la table de référence
          key: "id", // Colonne de référence dans la table de référence
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idRecepteur: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Nom de la table de référence
          key: "id", // Colonne de référence dans la table de référence
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Messages");
  },
};

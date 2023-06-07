"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Messages.belongsTo(models.Users, {
        foreignKey: "idExpediteur",
        as: "sender",
      });
      Messages.belongsTo(models.Users, {
        foreignKey: "idRecepteur",
        as: "receiver",
      });
    }
  }
  Messages.init(
    {
      contenu: DataTypes.STRING,
      idExpediteur: DataTypes.INTEGER,
      idRecepteur: DataTypes.INTEGER,
      userType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  return Messages;
};

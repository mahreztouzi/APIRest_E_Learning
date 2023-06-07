"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasOne(models.Enseignant, {
        foreignKey: "userId",
      });
      Users.hasOne(models.Apprenant, {
        foreignKey: "userId",
      });
      Users.hasMany(models.Messages, {
        foreignKey: "idExpediteur",
        as: "sentMessages",
      });
      Users.hasMany(models.Messages, {
        foreignKey: "idRecepteur",
        as: "receivedMessages",
      });
      Users.hasMany(models.Commentaire, {
        foreignKey: "idUser",
      });
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};

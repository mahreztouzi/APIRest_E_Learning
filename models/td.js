"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Td extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Td.belongsTo(models.Enseignant, { foreignKey: "idEnseignant" });
    }
  }
  Td.init(
    {
      namePdf: DataTypes.STRING,
      namePdfCorrection: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      idEnseignant: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Td",
    }
  );
  return Td;
};

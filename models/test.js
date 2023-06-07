"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Test.belongsTo(models.Enseignant, { foreignKey: "idEnseignant" });
    }
  }
  Test.init(
    {
      namePdf: DataTypes.STRING,
      namePdfCorrection: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      idEnseignant: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Test",
    }
  );
  return Test;
};

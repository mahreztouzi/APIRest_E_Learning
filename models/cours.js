"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cours.belongsTo(models.Enseignant, { foreignKey: "idEnseignant" });
      Cours.hasMany(models.Commentaire, {
        foreignKey: "idCours",
      });
    }
  }
  Cours.init(
    {
      namePdf: DataTypes.STRING,
      description: DataTypes.STRING,
      title: DataTypes.STRING,
      idEnseignant: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cours",
    }
  );
  return Cours;
};

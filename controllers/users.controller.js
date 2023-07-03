const models = require("../models");

function getAllUser(req, res) {
  models.Users.findAll()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la récupération des cours",
        error: err.message, // Utilisation de err.message pour obtenir le message d'erreur spécifique
      });
    });
}

module.exports = {
  getAllUser: getAllUser,
};

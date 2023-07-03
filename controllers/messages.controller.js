const models = require("../models");

function createMessage(req, res) {
  const idRecepteur = req.params.id;
  const userId = req.userData.userId;

  const data = {
    idRecepteur: idRecepteur,
    contenu: req.body.contenu,
    idExpediteur: userId,
    userType: req.userData.role === "professeur" ? "professeur" : "apprenant",
  };

  if (!data) {
    return res.status(400).json({ message: "les données sont requises" });
  }

  models.Messages.create(data)
    .then((message) => {
      res.status(201).json({
        message: "message créé avec succès",
        result: message,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "erreur lors de la création du message",
        error: e,
      });
    });
}

function getMsg(req, res) {
  const userId = req.userData.userId;
  const idRecepteur = req.params.id;

  models.Messages.findAll({
    where: {
      [models.Sequelize.Op.or]: [
        { idExpediteur: userId, idRecepteur: idRecepteur },
        { idExpediteur: idRecepteur, idRecepteur: userId },
      ],
    },
    include: [
      {
        model: models.Users,
        as: "sender",
        attributes: ["id", "name"], // Inclure uniquement les attributs souhaités
      },
      {
        model: models.Users,
        as: "receiver",
        attributes: ["id", "name"], // Inclure uniquement les attributs souhaités
      },
    ],
  })
    .then((messages) => {
      res.status(200).json({
        message: "Conversations de messages récupérées avec succès",
        messages: messages,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Erreur lors de la récupération des conversations de messages",
        error: error.message,
      });
    });
}

module.exports = {
  createMessage: createMessage,
  getMsg: getMsg,
};

const models = require("../models");
//creation d'un commentaire
function createComment(req, res) {
  const id = req.params.id;
  const comment = {
    contenu: req.body.contenu,
    idCours: id,
    idUser: req.userData.userId,
  };

  models.Cours.findByPk(id)
    .then((cour) => {
      if (cour === null) {
        res.status(404).json({
          message: "Post not found",
        });
      } else {
        models.Commentaire.create(comment)
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "Comment created successfully",
              comment: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Something went wrong",
              error: error,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

// afficher un commentaire
// function readComment(req, res) {
//   const id = req.params.id;

//   models.Commentaire.findByPk(id)
//     .then((result) => {
//       if (result) {
//         res.status(200).json(result);
//       } else {
//         res.status(404).json({
//           message: "Comment not found!",
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "Something went wrong!",
//       });
//     });
// }
function readComment(req, res) {
  const idCours = req.params.id;

  models.Commentaire.findAll({
    where: { idCours: idCours },
    include: models.Users,
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}
// update un commentaire
function updateComment(req, res) {
  const id = req.params.id;
  const userId = req.userData.userId;

  const updatedComment = {
    contenu: req.body.contenu,
  };

  models.Commentaire.update(updatedComment, {
    where: { id: id, idUser: userId },
  })
    .then((result) => {
      res.status(200).json({
        message: "Comment updated successfully",
        post: updatedComment,
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

// delete un commentaire
function destroyComment(req, res) {
  const id = req.params.id;
  const userId = req.params.id;

  models.Commentaire.destroy({ where: { id: id, idUser: userId } })
    .then((result) => {
      res.status(200).json({
        message: "Comment deleted successfully",
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "Something went wrong",
        error: error,
      });
    });
}
module.exports = {
  createComment: createComment,
  readComment: readComment,
  updateComment: updateComment,
  destroyComment: destroyComment,
};

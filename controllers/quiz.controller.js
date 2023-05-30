const models = require("../models");
const fs = require("fs");
const path = require("path");
//  cree un nouveau Quiz
function uploadQuiz(req, res) {
  const Quiz = {
    namePdf: req.file.filename,
    description: req.body.description,
    title: req.body.title,
    idEnseignant: req.userData.userId,
  };

  models.Quiz.create(Quiz)
    .then((result) => {
      res.status(201).json({
        message: "Quiz créé avec succès",
        cours: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la création du Quiz",
        error: err,
      });
    });
}
//  suppression d'un Quiz
function deleteQuiz(req, res) {
  const TdId = req.params.id;

  models.Quiz.findByPk(TdId)
    .then((Test) => {
      if (!Test) {
        return res.status(404).json({
          message: "Test non trouvé",
        });
      }

      const filePath = path.join(__dirname, "../uploads", Test.namePdf);

      // Supprimer le fichier du dossier d'upload
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression du fichier :", err);
        }
      });

      if (Test.namePdfCorrection) {
        const filePathCorrection = path.join(
          __dirname,
          "../uploads",
          Test.namePdfCorrection
        );

        // Supprimer le fichier de correction du dossier d'upload
        fs.unlink(filePathCorrection, (err) => {
          if (err) {
            console.error(
              "Erreur lors de la suppression du fichier de correction :",
              err
            );
          }
        });
      }

      // Supprimer le cours de la base de données
      Test.destroy()
        .then(() => {
          res.status(200).json({
            message: "Quiz supprimé avec succès",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Une erreur s'est produite lors de la suppression du Quiz",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la recherche du Quiz",
        error: err,
      });
    });
}
//  ajouter la correction
function uploadQuizCorrection(req, res, next) {
  const id = req.params.id;
  const userId = req.userData.userId;

  const updatedValue = {
    namePdfCorrection: req.file.filename,
  };

  // Vérifier s'il y a un nouveau fichier PDF téléchargé
  if (req.file) {
    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    updatedValue.namePdfCorrection = req.file.filename;

    // Vérifier si le cours existe et s'il a déjà un fichier PDF
    models.Quiz.findOne({ where: { id: id, idEnseignant: userId } })
      .then((td) => {
        if (td) {
          // S'il y a déjà un fichier PDF, supprimer l'ancien fichier
          if (td.namePdfCorrection) {
            const oldFilePath = path.join(
              __dirname,
              "../uploads",
              td.namePdfCorrection
            );
            fs.unlink(oldFilePath, (err) => {
              if (err) {
                console.error(
                  "Erreur lors de la suppression de l'ancien fichier PDF :",
                  err
                );
              }
            });
          }
        }

        // Mettre à jour les informations du cours
        models.Quiz.update(updatedValue, {
          where: { id: id, idEnseignant: userId },
        })
          .then((result) => {
            if (result == 1) {
              res.status(200).json({
                message: "Quiz ajouté avec succès",
                cours: updatedValue,
              });
            } else {
              res.status(404).json({ message: "Quiz non trouvé" });
            }
          })
          .catch((err) => {
            res.status(500).json({
              message:
                "Une erreur s'est produite lors de la mise à jour du Quiz",
              error: err,
            });
          });
      })
      .catch((err) => {
        console.error(
          "Une erreur s'est produite lors de la recherche du Quiz :",
          err
        );
        res.status(500).json({
          message: "Une erreur s'est produite lors de la mise à jour du Quiz",
          error: err,
        });
      });
  }
}
//  mise a jour du fichier Quiz ou les information
function updateQuiz(req, res, next) {
  const id = req.params.id;
  const userId = req.userData.userId;

  const updatedValue = {
    description: req.body.description,
    title: req.body.title,
  };

  // Vérifier s'il y a un nouveau fichier PDF téléchargé
  if (req.file) {
    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    updatedValue.namePdf = req.file.filename;

    // Vérifier si le cours existe et s'il a déjà un fichier PDF
    models.Quiz.findOne({ where: { id: id, idEnseignant: userId } })
      .then((test) => {
        if (test) {
          // S'il y a déjà un fichier PDF, supprimer l'ancien fichier
          if (test.namePdf) {
            const oldFilePath = path.join(
              __dirname,
              "../uploads",
              test.namePdf
            );
            fs.unlink(oldFilePath, (err) => {
              if (err) {
                console.error(
                  "Erreur lors de la suppression de l'ancien fichier PDF :",
                  err
                );
              }
            });
          }
        }

        // Mettre à jour les informations du Quiz
        models.Quiz.update(updatedValue, {
          where: { id: id, idEnseignant: userId },
        })
          .then((result) => {
            if (result == 1) {
              res.status(200).json({
                message: "Test mis à jour avec succès",
                cours: updatedValue,
              });
            } else {
              res.status(404).json({ message: "Quiz non trouvé" });
            }
          })
          .catch((err) => {
            res.status(500).json({
              message:
                "Une erreur s'est produite lors de la mise à jour du Quiz",
              error: err,
            });
          });
      })
      .catch((err) => {
        console.error(
          "Une erreur s'est produite lors de la recherche du cours :",
          err
        );
        res.status(500).json({
          message: "Une erreur s'est produite lors de la mise à jour du cours",
          error: err,
        });
      });
  } else {
    // Mettre à jour les informations du cours sans changer le fichier PDF
    models.Quiz.update(updatedValue, {
      where: { id: id, idEnseignant: userId },
    })
      .then((result) => {
        if (result == 1) {
          res.status(200).json({
            message: "Quiz mis à jour avec succès",
            cours: updatedValue,
          });
        } else {
          res.status(404).json({ message: "Quiz non trouvé" });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Une erreur s'est produite lors de la mise à jour du cours",
          error: err,
        });
      });
  }
}
// afficher un Quiz specifique existant sur la bdd
function show(req, res) {
  const id = req.params.id;
  models.Quiz.findByPk(id)
    .then((result) => {
      {
        result
          ? res.status(200).json(result)
          : res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
        error: err,
      });
    });
}
//  tester sur l'existance d'un Quiz avant de faire la mise a jour
function QuizuploadUpdate(req, res, next) {
  const id = req.params.id;
  const userId = req.userData.userId;

  models.Quiz.findOne({ where: { id: id, idEnseignant: userId } })
    .then((td) => {
      if (!td) {
        return res.status(404).json({ message: "Quiz non trouvé" });
      } else {
        // Votre logique de téléchargement du fichier PDF ici
        // Vous pouvez utiliser req.file pour accéder au fichier téléchargé

        next(); // Appeler la fonction suivante dans le flux de la requête
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la vérification du cours",
        error: err,
      });
    });
}
module.exports = {
  uploadQuiz: uploadQuiz,
  deleteQuiz: deleteQuiz,
  uploadQuizCorrection: uploadQuizCorrection,
  QuizuploadUpdate: QuizuploadUpdate,
  updateQuiz: updateQuiz,
  show: show,
};

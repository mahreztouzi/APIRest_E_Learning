const models = require("../models");
const fs = require("fs");
const path = require("path");
//  cree un nouveau Td
function uploadTd(req, res) {
  const Td = {
    namePdf: req.file.filename,
    description: req.body.description,
    title: req.body.title,
    idEnseignant: req.userData.userId,
  };

  models.Td.create(Td)
    .then((result) => {
      res.status(201).json({
        message: "Td créé avec succès",
        cours: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la création du cours",
        error: err,
      });
    });
}
//  suppression d'un td
function deleteTd(req, res) {
  const TdId = req.params.id;

  models.Td.findByPk(TdId)
    .then((Td) => {
      if (!Td) {
        return res.status(404).json({
          message: "Td non trouvé",
        });
      }

      const filePath = path.join(__dirname, "../uploads", Td.namePdf);

      // Supprimer le fichier du dossier d'upload
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression du fichier :", err);
        }
      });

      if (Td.namePdfCorrection) {
        const filePathCorrection = path.join(
          __dirname,
          "../uploads",
          Td.namePdfCorrection
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
      Td.destroy()
        .then(() => {
          res.status(200).json({
            message: "Td supprimé avec succès",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message:
              "Une erreur s'est produite lors de la suppression du cours",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la recherche du cours",
        error: err,
      });
    });
}
//  ajouter la correction
function uploadTdCorrection(req, res, next) {
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
    models.Td.findOne({ where: { id: id, idEnseignant: userId } })
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
        models.Td.update(updatedValue, {
          where: { id: id, idEnseignant: userId },
        })
          .then((result) => {
            if (result == 1) {
              res.status(200).json({
                message: "Td ajouté avec succès",
                cours: updatedValue,
              });
            } else {
              res.status(404).json({ message: "Td non trouvé" });
            }
          })
          .catch((err) => {
            res.status(500).json({
              message:
                "Une erreur s'est produite lors de la mise à jour du cours",
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
  }
}
//  mise a jour du fichier td ou les information
function updateTd(req, res, next) {
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
    models.Td.findOne({ where: { id: id, idEnseignant: userId } })
      .then((td) => {
        if (td) {
          // S'il y a déjà un fichier PDF, supprimer l'ancien fichier
          if (td.namePdf) {
            const oldFilePath = path.join(__dirname, "../uploads", td.namePdf);
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
        models.Td.update(updatedValue, {
          where: { id: id, idEnseignant: userId },
        })
          .then((result) => {
            if (result == 1) {
              res.status(200).json({
                message: "Td mis à jour avec succès",
                cours: updatedValue,
              });
            } else {
              res.status(404).json({ message: "Cours non trouvé" });
            }
          })
          .catch((err) => {
            res.status(500).json({
              message:
                "Une erreur s'est produite lors de la mise à jour du cours",
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
    models.Td.update(updatedValue, {
      where: { id: id, idEnseignant: userId },
    })
      .then((result) => {
        if (result == 1) {
          res.status(200).json({
            message: "Td mis à jour avec succès",
            cours: updatedValue,
          });
        } else {
          res.status(404).json({ message: "Td non trouvé" });
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

//  tester sur l'existance d'un cours avant de faire la mise a jour
function TestuploadUpdate(req, res, next) {
  const id = req.params.id;
  const userId = req.userData.userId;

  models.Td.findOne({ where: { id: id, idEnseignant: userId } })
    .then((td) => {
      if (!td) {
        return res.status(404).json({ message: "td non trouvé" });
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
  uploadTd: uploadTd,
  deleteTd: deleteTd,
  uploadTdCorrection: uploadTdCorrection,
  TestuploadUpdate: TestuploadUpdate,
  updateTd: updateTd,
};

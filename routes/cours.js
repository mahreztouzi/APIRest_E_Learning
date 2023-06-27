const express = require("express");
const coursController = require("../controllers/cours.controller");
const coursUploader = require("../helpers/cours-uploader");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post(
  "/uploads",
  checkAuth.checkAuth,
  coursUploader.upload.single("pdf"),
  coursController.upload
);

router.delete("/:id", checkAuth.checkAuth, coursController.deleteCours);
router.patch(
  "/:id",
  checkAuth.checkAuth,
  coursController.TestUploadUpdate,
  coursUploader.upload.single("pdf"),
  coursController.updateCours
);
// router.get("/:id", checkAuth.checkAuth, coursController.show);
// router.get("/upload", coursController.showAllTitleCours);

router.get("/:id", checkAuth.checkAuth, coursController.show);
router.get("/titles", coursController.showAllTitleCours);
router.get(
  "/enseignant/:enseignantId",
  checkAuth.checkAuth,
  coursController.getCoursByEnseignant
);
router.get("/", checkAuth.checkAuth, coursController.getAllCours);

module.exports = router;

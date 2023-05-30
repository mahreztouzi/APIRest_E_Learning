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

router.delete("/uploads/:id", checkAuth.checkAuth, coursController.deleteCours);
router.patch(
  "/uploads/:id",
  checkAuth.checkAuth,
  coursController.TestUploadUpdate,
  coursUploader.upload.single("pdf"),
  coursController.updateCours
);
router.get("/uploads", coursController.showAllTitleCours);

module.exports = router;

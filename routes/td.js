const express = require("express");
const TdController = require("../controllers/td.controller");
const coursUploader = require("../helpers/cours-uploader");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
// poster un nouveau td
router.post(
  "/uploads",
  checkAuth.checkAuth,
  coursUploader.upload.single("pdf"),
  TdController.uploadTd
);
// poster une correction ou modifier une correction
router.patch(
  "/uploads/correction/:id",
  checkAuth.checkAuth,
  TdController.TestuploadUpdate,
  coursUploader.upload.single("pdf"),
  TdController.uploadTdCorrection
);
// mise a jour td
router.patch(
  "/uploads/:id",
  checkAuth.checkAuth,
  TdController.TestuploadUpdate,
  coursUploader.upload.single("pdf"),
  TdController.updateTd
);

// supprimer un td
router.delete("/uploads/:id", checkAuth.checkAuth, TdController.deleteTd);

module.exports = router;

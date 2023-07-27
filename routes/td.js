const express = require("express");
const TdController = require("../controllers/td.controller");
const coursUploader = require("../helpers/cours-uploader");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
// poster un nouveau td
router.post(
  "/",
  checkAuth.checkAuth,
  coursUploader.upload.single("pdf"),
  TdController.uploadTd
);
// poster une correction ou modifier une correction
router.patch(
  "/correction/:id",
  checkAuth.checkAuth,
  TdController.TestuploadUpdate,
  coursUploader.upload.single("pdf"),
  TdController.uploadTdCorrection
);
// mise a jour td
router.patch(
  "/:id",
  checkAuth.checkAuth,
  TdController.TestuploadUpdate,
  coursUploader.upload.single("pdf"),
  TdController.updateTd
);
// afficher un td
router.get("/:id", checkAuth.checkAuth, TdController.show);
// supprimer un td
router.delete("/:id", checkAuth.checkAuth, TdController.deleteTd);

module.exports = router;

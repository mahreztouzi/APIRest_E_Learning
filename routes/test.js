const express = require("express");
const TestController = require("../controllers/test.controller");
const coursUploader = require("../helpers/cours-uploader");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
// poster un nouveau td
router.post(
  "/",
  checkAuth.checkAuth,
  coursUploader.upload.single("pdf"),
  TestController.uploadTest
);
// poster une correction ou modifier une correction
router.patch(
  "/correction/:id",
  checkAuth.checkAuth,
  TestController.TestuploadUpdate,
  coursUploader.upload.single("pdf"),
  TestController.uploadTestCorrection
);
// mise a jour td
router.patch(
  "/:id",
  checkAuth.checkAuth,
  TestController.TestuploadUpdate,
  coursUploader.upload.single("pdf"),
  TestController.updateTest
);

// supprimer un td
router.delete(
  "/:id",
  checkAuth.checkAuth,
  TestController.TestuploadUpdate,
  TestController.deleteTest
);
// afficher un Test
router.get("/:id", checkAuth.checkAuth, TestController.show);

module.exports = router;

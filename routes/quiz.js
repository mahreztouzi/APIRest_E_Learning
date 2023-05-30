const express = require("express");
const QuizController = require("../controllers/quiz.controller");
const coursUploader = require("../helpers/cours-uploader");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
// poster un nouveau Quiz
router.post(
  "/uploads",
  checkAuth.checkAuth,
  coursUploader.upload.single("pdf"),
  QuizController.uploadQuiz
);
// poster une correction ou modifier une correction
router.patch(
  "/uploads/correction/:id",
  checkAuth.checkAuth,
  QuizController.QuizuploadUpdate,
  coursUploader.upload.single("pdf"),
  QuizController.uploadQuizCorrection
);
// mise a jour Quiz
router.patch(
  "/uploads/:id",
  checkAuth.checkAuth,
  QuizController.QuizuploadUpdate,
  coursUploader.upload.single("pdf"),
  QuizController.updateQuiz
);

// supprimer un td
router.delete(
  "/uploads/:id",
  checkAuth.checkAuth,
  QuizController.QuizuploadUpdate,
  QuizController.deleteQuiz
);
// afficher un Test
router.get("/:id", checkAuth.checkAuth, QuizController.show);

module.exports = router;

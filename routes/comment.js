const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentaire.controller");
const checkAuth = require("../middleware/check-auth");

router.post(
  "/uploads/:id",
  checkAuth.checkAuth,
  commentController.createComment
);

router.get("/uploads/:id", checkAuth.checkAuth, commentController.readComment);
router.patch(
  "/uploads/:id",
  checkAuth.checkAuth,
  commentController.updateComment
);
router.delete(
  "/uploads/:id",
  checkAuth.checkAuth,
  commentController.destroyComment
);

module.exports = router;

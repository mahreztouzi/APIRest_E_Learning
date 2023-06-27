const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentaire.controller");
const checkAuth = require("../middleware/check-auth");

router.post("/:id", checkAuth.checkAuth, commentController.createComment);

router.get("/:id", checkAuth.checkAuth, commentController.readComment);
router.patch("/:id", checkAuth.checkAuth, commentController.updateComment);
router.delete("/:id", checkAuth.checkAuth, commentController.destroyComment);

module.exports = router;

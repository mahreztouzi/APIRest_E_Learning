const express = require("express");
const router = express.Router();
const messageRouter = require("../controllers/messages.controller");
const checkAuth = require("../middleware/check-auth");

router.post("/:id", checkAuth.checkAuth, messageRouter.createMessage);
router.get("/:id", checkAuth.checkAuth, messageRouter.getMsg);
module.exports = router;

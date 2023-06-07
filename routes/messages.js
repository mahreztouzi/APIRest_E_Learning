const express = require("express");
const router = express.Router();
const messageRouter = require("../controllers/messages.controller");
const checkAuth = require("../middleware/check-auth");

router.post("/uploads/:id", checkAuth.checkAuth, messageRouter.createMessage);
router.get("/", checkAuth.checkAuth, messageRouter.getMsg);
module.exports = router;

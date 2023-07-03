const express = require("express");
const router = express.Router();

const userRouter = require("../controllers/users.controller");

router.get("/", userRouter.getAllUser);
module.exports = router;

const express = require("express");
const router = express.Router();
const enseignantController = require("../controllers/enseigant.controller");

router.post("/sign-up", enseignantController.signUp);
router.post("/login", enseignantController.login);
module.exports = router;

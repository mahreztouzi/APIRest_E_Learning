const express = require("express");
const router = express.Router();
const enseignantController = require("../controllers/enseigant.controller");

router.post("/:email", enseignantController.signUp);
router.post("/", enseignantController.login);
module.exports = router;

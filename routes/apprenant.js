const express = require("express");
const router = express.Router();
const apprenantController = require("../controllers/apprenant.controller");

router.post("/sign-up", apprenantController.signUp);
router.post("/login", apprenantController.login);
module.exports = router;

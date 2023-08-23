const express = require("express");
const router = express.Router();
const usersController = require("../controller/userController");

router.route("/").post(usersController.createNewUser);

module.exports = router;

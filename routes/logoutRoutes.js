"use strict";
const express = require("express");
//const app = express();
const router = express.Router();

const userController = require("../controllers/userController");

// app.set("view engine", "pug"); // set the view engine to pug
// app.set("views", "views"); // set the views directory

router.get("/", userController.logout);

module.exports = router;

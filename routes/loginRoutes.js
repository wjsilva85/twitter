"use strict";
const express = require("express");
//const app = express();
const router = express.Router();

const userController = require("../controllers/userController");

// app.set("view engine", "pug"); // set the view engine to pug
// app.set("views", "views"); // set the views directory

router.post("/", userController.login);
router.get("/", (req, res, next) => {
  res.status(200).render("login"); // send a response
});

module.exports = router;

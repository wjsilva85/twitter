"use strict";
const express = require("express");
const app = express();
const router = express.Router();

app.set("view engine", "pug"); // set the view engine to pug
app.set("views", "views"); // set the views directory

router.get("/", (req, res) => {
  res.status(200).render("login"); // send a response
});

module.exports = router;

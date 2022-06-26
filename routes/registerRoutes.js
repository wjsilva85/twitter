"use strict";
const express = require("express");
const app = express();
const router = express.Router();

app.set("view engine", "pug"); // set the view engine to pug
app.set("views", "views"); // set the views directory

router.get("/", (req, res) => {
  res.status(200).render("register"); // send a response
});

router.post("/", (req, res) => {
  Object.keys(req.body).forEach((key) => {
    req.body[key] = req.body[key].trim();
  });
  const hasEmptyFields = Object.values(req.body).some((value) => value === "");

  //const { firstName, lastName, username, password } = req.body;

  const payload = req.body;

  if (hasEmptyFields) {
    payload.error = "Please fill out all fields";
    res.status(400).render("register", payload); // send a response
  } else {
    payload.success = "Registration successful";
    res.status(200).render("register", payload); // send a response
  }
});

module.exports = router;

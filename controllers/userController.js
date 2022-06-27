"use strict";

const { models } = require("../mongoose");

exports.register = (req, res, next) => {
  Object.keys(req.body).forEach((key) => {
    req.body[key] = req.body[key].trim();
  });
  const hasEmptyFields = Object.values(req.body).some((value) => value === "");

  //const { firstName, lastName, username, password } = req.body;

  const payload = req.body;
  console.log("req.body", req.body);

  if (hasEmptyFields) {
    payload.error = "Please fill out all fields";
    res.status(400).render("register", payload); // send a response
  } else {
    models.user
      .findOne({
        $or: [{ username: payload.username }, { email: payload.email }],
      })
      .then((user) => {
        if (user) {
          payload.error = "User already exists";
          console.log("payload", payload);
          console.log("user", user);
          res.status(400).render("register", payload); // send a response
        } else {
          return models.user.create(payload);
        }
      })

      .then((user) => {
        if (!user) return;
        payload.success = "Registration successful";
        res.status(200).render("login", payload); // send a response
      })
      .catch((err) => {
        console.error(err);
        payload.error = "User already exists";
        res.status(500).render("register", payload); // send a response
      });
  }
};

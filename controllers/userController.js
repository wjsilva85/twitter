"use strict";

const { models } = require("../mongoose");
const bcrypt = require("bcrypt");

exports.register = (req, res, next) => {
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
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        req.body.password = hash;
        return models.user.findOne({
          $or: [{ username: payload.username }, { email: payload.email }],
        });
      })

      .then((user) => {
        if (user) {
          payload.error = "User already exists";

          res.status(400).render("register", payload); // send a response
        } else {
          return models.user.create(payload);
        }
      })

      .then((user) => {
        if (!user) return;
        req.session.user = user;
        payload.success = "Registration successful";
        payload.password = payload.passwordConf;
        res.status(200).render("login", payload); // send a response
      })
      .catch((err) => {
        console.error(err);
        payload.error = "User already exists";
        payload.password = payload.passwordConf;
        res.status(500).render("register", payload); // send a response
      });
  }
};

exports.login = (req, res, next) => {
  //res.status(200).render("login"); // send a response
  const payload = req.body;
  let _user;
  models.user
    .findOne({
      $or: [{ username: payload.username }, { email: payload.username }],
    })
    .then((user) => {
      _user = user;
      if (!user) {
        payload.error = "User not found";
        res.status(400).render("login", payload); // send a response
      } else {
        payload.userLoggedIn = user;
        return bcrypt.compare(payload.password, user.password);
      }
    })
    .then((isValid) => {
      if (!_user) return;
      if (!isValid) {
        payload.error = "Invalid password";
        res.status(400).render("login", payload); // send a response
      } else {
        req.session.user = _user;
        payload.success = "Login successful";
        res.redirect("/"); // send a response
      }
    })
    .catch((err) => {
      console.error(err);
      payload.error = "User not found";
      res.status(500).render("login", payload); // send a response
    });
};

exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login"); // send a response
};

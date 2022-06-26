"use strict";
const express = require("express");
const app = express();
const port = 3000;
const middleware = require("./middleware");
const path = require("path");

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log('"I find your lack of faith is disturbing" - Darth Vader');
}); // end of server

app.set("view engine", "pug"); // set the view engine to pug
app.set("views", "views"); // set the views directory

app.use(express.static(path.join(__dirname, "public"))); // set the public directory

//Routes
const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

app.get("/", middleware.requireLogin, (req, res) => {
  let payload = {
    pageTitle: "Home",
  };

  res.status(200).render("home", payload); // send a response
});

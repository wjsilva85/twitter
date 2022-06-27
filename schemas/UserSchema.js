"use strict";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 15,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 15,
    },
    profilePicture: {
      type: String,
      default: "/images/default-profile-picture.png",
    },
  },
  { timestamps: true }
);

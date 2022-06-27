const mongoose = require("./config/mongoDb");

const userSchema = require("./schemas/UserSchema");

mongoose.model("user", userSchema);

module.exports = mongoose;

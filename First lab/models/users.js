const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

const Users = new model("users", schema);
module.exports = { Users };

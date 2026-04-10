const mongoose = require("mongoose");
const { use } = require("react");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    requred: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel
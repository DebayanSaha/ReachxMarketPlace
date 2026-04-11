const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const clientModel = mongoose.model("client", clientSchema);

module.exports = clientModel;

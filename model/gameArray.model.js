const mongoose = require("mongoose");

// Define the User schema
const gameArraySchema = new mongoose.Schema(
  {
    wordArray: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("gameArray", gameArraySchema);

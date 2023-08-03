const mongoose = require("mongoose");

// Define the User schema
const statsSchema = new mongoose.Schema(
  {
    gamesPlayed: {
      type: String,
      required: true,
    },
    gamesWon: {
      type: String,
      required: false,
    },
    percentageOfWin: {
      type: String,
      required: false,
    },
    bestTry: {
      type: String,
      required: false,
    },
    currentStreak: {
      type: String,
      required: false,
    },
    maxStreak: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stats", statsSchema);

const gameArray = require("../model/gameArray.model");

let methods = {
  addGameArray: async (req, res) => {
    try {
      let data = req.body;
      console.log(data);
      if (!data) {
        return res.status(404).json({
          msg: "Please Input stats details to add",
          success: false,
        });
      }
      let findStatsIfExists = await gameArray.findOne({});
      if (findStatsIfExists) {
        return res.status(400).json({
          msg: "game array already exists",
          success: false,
        });
      }
      let array = new gameArray(data);
      let addGameArray = await array.save();
      if (!addGameArray) {
        return res.status(404).json({
          msg: "game array not added",
          success: false,
        });
      }
      res.status(200).json({
        gameArray: addGameArray,
        msg: "Game array added successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Failed to add game array",
        error: error,
        success: false,
      });
    }
  },

  viewGameArray: async (req, res) => {
    try {
      let findGameArray = await gameArray.findOne({});

      if (!findGameArray) {
        return res.status(404).json({
          msg: "No record exist",
          success: false,
        });
      }
      return res.status(200).json({
        gameArray: findGameArray,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Failed to view game array",
        error: error,
        success: false,
      });
    }
  },
};

module.exports = methods;

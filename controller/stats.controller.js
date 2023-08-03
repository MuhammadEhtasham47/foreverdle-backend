let Stats = require("../model/stats.model");

let methods = {
  addStats: async (req, res) => {
    try {
      let { _id } = req.token;
      console.log(_id);
      let data = req.body;
      if (!data) {
        return res.status(404).json({
          msg: "Please Input stats details to add",
          success: false,
        });
      }
      let findStatsIfExists = await Stats.findOne({
        userId: _id,
      });
      if (findStatsIfExists) {
        return res.status(400).json({
          msg: "Stats for this user already exist",
          success: false,
        });
      }
      data.userId = _id;
      let stats = new Stats(data);
      let addStats = await stats.save();
      if (!addStats) {
        return res.status(404).json({
          msg: "Stats is not added",
          success: false,
        });
      }
      res.status(200).json({
        Stats: addStats,
        msg: "Stats added",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Failed to add stats",
        error: error,
        success: false,
      });
    }
  },

  viewStats: async (req, res) => {
    try {
      let _id = req.token._id;

      let findStats = await Stats.findOne({ userId: _id });

      if (!findStats) {
        return res.status(404).json({
          msg: "No record exist for this user",
          success: false,
        });
      }
      return res.status(200).json({
        Stats: findStats,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Failed to view stats",
        error: error,
        success: false,
      });
    }
  },

  updateStats: async (req, res) => {
    try {
      let { userId } = req.body;
      let data = req.body;
      console.log(userId);
      let existingStats = await Stats.findOneAndUpdate(
        { userId: userId },
        { ...data },
        { new: true }
      );
      if (!existingStats) {
        return res.status(404).json({
          msg: "Stats not found",
          success: false,
        });
      }
      res.status(200).json({
        data: existingStats,
        msg: "Stats updated",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Failed to update stats",
        error: error,
        success: false,
      });
    }
  },
};

module.exports = methods;

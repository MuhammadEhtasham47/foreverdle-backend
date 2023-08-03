let utils = require("../utils/index");
let bcrypt = require("bcrypt");
let User = require("../model/user.model");

let methods = {
  signUp: async (req, res) => {
    try {
      let data = req.body;

      let email = data.email;

      let userExist = await User.findOne({ email });

      if (userExist) {
        return res.status(409).json({
          msg: "User already exist with this email",
        });
      }

      data.password = await bcrypt.hash(data.password, 10);

      let user = new User(data);

      let addUser = await user.save();

      if (!addUser) {
        return res.status(400).json({
          msg: "Bad Reqeust! Fill out the required fields to Add User",
          success: false,
        });
      }

      return res.status(200).json({
        User: {
          email: user.email,
        },
        msg: "User added",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        msg: `Failed to create new User`,
        error: error.message,
        success: false,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      let data = req.body;
      let email = data.email;
      let password = data.password;

      if (!email || !password) {
        return res.status(401).json({
          msg: "Please enter right Credentials!",
          success: false,
        });
      }

      let user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          msg: "User with email does not found",
          success: false,
        });
      }

      let match = await utils.comparePassword(password, user.password);

      if (!match) {
        return res.status(401).json({
          msg: "Wrong Password Entered",
          success: false,
        });
      }
      let access_token = await utils.issueToken({
        _id: user._id,
      });

      let result = {
        user: {
          _id: user._id,
          email: email,
        },
        access_token,
      };
      return res.status(200).json({ success: true, result });
    } catch (error) {
      return res.status(500).json({
        msg: "Login Failed",
        error: error.message,
        success: false,
      });
    }
  },
};

module.exports = methods;

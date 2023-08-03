const router = require("express").Router();
const UserController = require("../controller/user.controller");

let api = "/user";

router.post(`${api}/sign-up`, UserController.signUp);
router.post(`${api}/login-user`, UserController.loginUser);

module.exports = router;

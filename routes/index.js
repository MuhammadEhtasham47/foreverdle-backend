const router = require("express").Router();
const userRouter = require("./user.route");
const statsRouter = require("./stats.route");
const gameArrayRouter = require("./gameArray.route");

router.use("", userRouter);
router.use("", statsRouter);
router.use("", gameArrayRouter);

module.exports = router;

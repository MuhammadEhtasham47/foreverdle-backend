const router = require("express").Router();
const StatsController = require("../controller/stats.controller");
const authPolicy = require("../utils/auth.policy");

let api = "/stats";

router.post(`${api}/add-stats`, authPolicy, StatsController.addStats);
router.get(`${api}/view-stats`, authPolicy, StatsController.viewStats);
router.put(`${api}/update-stats`, authPolicy, StatsController.updateStats);

module.exports = router;

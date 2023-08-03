const router = require("express").Router();
const gameArrayController = require("../controller/gameArray.controller");

let api = "/game-array";

router.post(`${api}/add-array`, gameArrayController.addGameArray);
router.get(`${api}/view-array`, gameArrayController.viewGameArray);

module.exports = router;

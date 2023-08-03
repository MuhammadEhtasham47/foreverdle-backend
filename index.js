const Router = require("./routes/index");
var mongoose = require("mongoose");
var cors = require("cors");
const cronJob = require("node-cron");

const express = require("express");
const app = express();

var bodyParser = require("body-parser");
//eslint-disable-next-line
var jsonParser = bodyParser.json();

//ignore this line
//eslint-disable-next-line
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());

app.use(express.json());

const dbName = "foreverdle";

mongoose.connect(
  `mongodb+srv://ehtasham:eKRVppQnJNXdBHLK@cluster0.uccderx.mongodb.net/`,
  {
    useNewUrlParser: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
    writeConcern: { w: "majority", j: true, wtimeout: 1000 },
    dbName,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", function () {
  console.log("Connected successfully!");
});

const { arrayUpdateScenario } = require("./cronJon/cronJob");

// cronJob.schedule("30 19 * * 1-5", attendanceCheckOut);
// cronJob.schedule("30 19 * * 1-5", absentScenario);

cronJob.schedule("* * * * * *", arrayUpdateScenario);

app.use("/", Router);

var port = 3000;

app.listen(port, (err) => {
  if (err) console.log("err");
  console.log(`server is running on port ${port}`);
});

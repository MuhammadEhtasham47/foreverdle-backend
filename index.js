const Router = require("./Routes/index");
var mongoose = require("mongoose");
var cors = require("cors");
const cronJob = require("node-cron");

const express = require("express");
const app = express();

const { errors } = require("celebrate");

var bodyParser = require("body-parser");
//eslint-disable-next-line
var jsonParser = bodyParser.json();

//ignore this line
//eslint-disable-next-line
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  // useFindAndModify: true,
  useUnifiedTopology: true,
  writeConcern: { w: "majority", j: true, wtimeout: 1000 },
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", function () {
  console.log("Connected successfully!");
});

app.use("/", Router);
app.use(errors());

var port = process.env.PORT || 3001;

var env = process.env.NODE_ENV;

if (env == "development") {
  app.listen(process.env.PORT, (err) => {
    if (err) console.log("err");
    console.log(`server is running on port ${port}`);
  });
} else {
  console.log("now in production");
  app.listen(process.env.PORT, (err) => {
    if (err) console.log("err");
    console.log(`server is running on port ${process.env.PORT}`);
  });
}

require("dotenv").config();
const winston = require("winston");
const { combine, timestamp, json, prettyPrint,errors } = winston.format;
const express = require("express");
const cors = require("cors");
const passport = require("./controllers/passportController");
const app = express();

// log file
const logger = winston.createLogger({
  level: "debug",
  format: combine(timestamp(), json(), prettyPrint(),errors({stack:true})),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log", level: "error" }),
  ],
});
const requestLog = { method: "GET", istAuthenticated: false };
const childLogger = logger.child(requestLog);

logger.info("An info log");
logger.error("An error log" , new Error("504"));

app.use(express.json());
app.use(cors());

const routes = require("./routes/authroute");


app.use("/api", routes, passport.initialize());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

module.exports = app;

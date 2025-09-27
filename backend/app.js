require("dotenv").config();
const winston = require("winston");
const { combine, timestamp, json, prettyPrint,errors } = winston.format;
const express = require("express");
const cors = require("cors");
const passport = require("./config/passportController");
const app = express();

// log file
const logger = winston.createLogger({
  level: "debug",
  format: combine(
    errors({ stack: true }),
    timestamp(),
    prettyPrint() 
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "app.log",
      level: "error",
      format: combine(errors({ stack: true }), timestamp(), json()) // in Datei JSON
    }),
  ],
});

logger.error(new Error("504"))
app.use(express.json());
app.use(cors());

const routes = require("./routes/authroute");


app.use("/api", routes, passport.initialize());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

module.exports = app;

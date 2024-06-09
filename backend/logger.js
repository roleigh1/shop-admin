// logger.js
const { createLogger, transports, format } = require("winston");
const expressWinston = require("express-winston");

const logger = expressWinston.logger({
  transports: [
    new transports.Console(),
    new transports.File({
      level: "warn",
      filename: "logsWarnings.log",
    }),
    new transports.File({
      level: "error",
      filename: "logsErrors.log",
    }),
  ],
  format: format.combine(
    format.json(),
    format.prettyPrint(),
    format.timestamp()
  ),
  statusLevels: true,
});

module.exports = logger;

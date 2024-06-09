// logger.js
const { createLogger, transports, format } = require("winston");
const expressWinston = require("express-winston");
const { time } = require("console");


const myFormat = format.printf(({level,meta,timestamp}) => {
    return `${timestamp} ${level} : ${meta.message}`
})    

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
    format.timestamp(),
    myFormat
  ),
  statusLevels: true,
});
const errorLogger = expressWinston.errorLogger({
    transports:[
        new transports.File({
            filename:"logsInternalErrors.log"
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(), 
        format.prettyPrint()
    )
})

module.exports = {logger,errorLogger};

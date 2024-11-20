const { transports, format } = require("winston");
const expressWinston = require("express-winston");

const myFormat = format.printf(({ level, message, meta, timestamp }) => {
  let logMessage = `${timestamp} ${level}: ${message}`;
  
  if (meta) {
    if (meta.message) {
      logMessage += ` - ${meta.message}`;
    } else {
      logMessage += ' - No message provided';
    }
    
    // Include request and response information if available
    if (meta.req) {
      logMessage += `\nRequest: ${JSON.stringify(meta.req, null, 2)}`;
    }
    if (meta.res) {
      logMessage += `\nResponse: ${JSON.stringify(meta.res, null, 2)}`;
    }
  }
  
  return logMessage;
});

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
    format.timestamp(),
    format.json(),
    myFormat
  ),
  statusLevels: true,
  meta: true, // This ensures meta information is logged
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new transports.File({
      filename: "logsInternalErrors.log",
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.prettyPrint()
  ),
  meta: true, // This ensures meta information is logged
});

module.exports = { logger, errorLogger };
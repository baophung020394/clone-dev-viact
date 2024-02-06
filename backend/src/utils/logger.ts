import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  // format: winston.format.json(),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({
      filename: '../logs/error.log',
      level: 'error',
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  }),
);

export default logger;

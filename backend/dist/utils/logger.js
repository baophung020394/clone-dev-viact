"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = winston_1.default.createLogger({
    level: 'error',
    transports: [
        new winston_1.default.transports.File({
            filename: '../logs/error.log',
            level: 'error',
        }),
    ],
});
logger.add(new winston_1.default.transports.Console({
    format: winston_1.default.format.simple(),
}));
exports.default = logger;
//# sourceMappingURL=logger.js.map
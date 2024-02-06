"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
const lodash_1 = require("lodash");
const jsonResponse = (res, message, data = {}, httpCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, internalCode = 0) => {
    if (!internalCode) {
        internalCode = httpCode;
    }
    const responseObject = {
        code: internalCode,
        message: message,
    };
    if (!(0, lodash_1.isEmpty)(data)) {
        responseObject.data = data;
        if (httpCode < http_status_codes_1.StatusCodes.OK || httpCode >= http_status_codes_1.StatusCodes.MULTIPLE_CHOICES) {
            if (process.env.APP_ENV === 'production')
                delete responseObject.data;
        }
    }
    res.status(httpCode).json(responseObject);
};
exports.jsonResponse = jsonResponse;
//# sourceMappingURL=responseHandler.js.map
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from 'lodash';

export const jsonResponse = (
  res?: Response,
  message?: string,
  data: any = {},
  httpCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
  internalCode: number = 0,
) => {
  if (!internalCode) {
    internalCode = httpCode;
  }
  const responseObject: { code: number; message: string; data?: any } = {
    code: internalCode,
    message: message,
  };

  if (!isEmpty(data)) {
    responseObject.data = data;
    if (httpCode < StatusCodes.OK || httpCode >= StatusCodes.MULTIPLE_CHOICES) {
      // logger.error(stringify(responseObject));
      if (process.env.APP_ENV === 'production') delete responseObject.data;
    }
  }

  res.status(httpCode).json(responseObject);
};

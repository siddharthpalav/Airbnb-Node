import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import logger from "../config/logger.config";
import { StatusCodes } from "http-status-codes";

/**
 *
 * @param schema - Zod schema to validate the request body
 * @returns - Middleware function to validate the request body
 */
export const validateRequestBody = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      logger.info("Request body is valid");
      next();
    } catch (error) {
      // If the validation fails,
      logger.error("Request body is invalid");
      res.status(StatusCodes.OK).json({
        message: "Invalid request body",
        success: false,
        error: error,
      });
    }
  };
};

export const validateQueryParams = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      console.log("Query params are valid");
      next();
    } catch (error) {
      // If the validation fails,

      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid query params",
        success: false,
        error: error,
      });
    }
  };
};

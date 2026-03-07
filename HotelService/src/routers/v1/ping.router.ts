import express, { Router } from "express";
import { pingHandler } from "../../controllers/ping.controller";
import { validateRequestBody } from "../../validators";
import { pingSchema } from "../../validators/ping.validator";
import { StatusCodes } from "http-status-codes";

const pingRouter: Router = express.Router();

pingRouter.get("/", validateRequestBody(pingSchema), pingHandler); // TODO: Resolve this TS compilation issue

pingRouter.get("/health", (req, res) => {
  res.status(StatusCodes.OK).send("OK");
});

export default pingRouter;

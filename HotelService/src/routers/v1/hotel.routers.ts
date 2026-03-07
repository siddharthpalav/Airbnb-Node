import express, { Router } from "express";
import {
  createHotelHandler,
  getHotelByIdHandler,
  getAllHotelsHandler,
  deleteHotelHandler,
  updateHotelHandler,
} from "../../controllers/hotel.controller";
import { validateRequestBody } from "../../validators";
import { hotelSchema } from "../../validators/hotel.validator";

const hotelRouter: Router = express.Router();

hotelRouter.post("/", validateRequestBody(hotelSchema), createHotelHandler); // TODO: Resolve this TS compilation issue

hotelRouter.get("/", getAllHotelsHandler);

hotelRouter.get("/:id", getHotelByIdHandler);

hotelRouter.delete("/:id", deleteHotelHandler);

hotelRouter.patch("/:id", updateHotelHandler);

export default hotelRouter;

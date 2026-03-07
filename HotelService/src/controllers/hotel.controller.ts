import { NextFunction, Request, Response } from "express";
// import logger from "../config/logger.config";
import {
  createHotelService,
  getHotelByIdService,
  getAllHotelService,
  deleteHotelService,
  updateHotelService,
} from "../services/hotel.service";
import { StatusCodes } from "http-status-codes";

export const createHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 1. Call hte service layer
  const hotelResponse = await createHotelService(req.body);

  // 2. Send the response

  res.status(StatusCodes.CREATED).json({
    message: "Hotel created successfully",
    data: hotelResponse,
    success: true,
  });
};

export const getHotelByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 1. Call hte service layer
  const hotelResponse = await getHotelByIdService(Number(req.params.id));

  // 2. Send the response

  res.status(StatusCodes.OK).json({
    message: "Hotel received successfully",
    data: hotelResponse,
    success: true,
  });
};

export const getAllHotelsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const hotelsResponse = await getAllHotelService();

  res.status(StatusCodes.OK).json({
    message: "Hotels found successfully",
    data: hotelsResponse,
    success: true,
  });
};

export const deleteHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const hotelResponse = await deleteHotelService(Number(req.params.id));

  res.status(StatusCodes.OK).json({
    message: `Hotel deleted successfully`,
    data: hotelResponse,
    success: true,
  });
};

export const updateHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const hotleResponse = await updateHotelService(
    Number(req.params.id),
    req.body,
  );

  res.status(StatusCodes.OK).json({
    message: `Hotel details updated successfully`,
    data: hotleResponse,
    success: true,
  });
};

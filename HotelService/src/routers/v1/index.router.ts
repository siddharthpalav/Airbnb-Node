import express, { Router } from "express";
import pingRouter from "./ping.router";
import hotelRouter from "./hotel.routers";

const v1Router: Router = express.Router();

v1Router.use("/ping", pingRouter);

v1Router.use("/hotel", hotelRouter);

export default v1Router;

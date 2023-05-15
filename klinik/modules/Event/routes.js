import express from "express";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import Controller from "./controller.js";
import routeGuard from "..//middlewares/routeGuard.js";

const router = express.Router();

router.post(
  "/",
  routeGuard,
  body(["user", "trainer", "startDate", "endDate", "title"]).exists(),
  validator,
  Controller.addEvent
);

router.get(
  "/",
  routeGuard,
  query(["startDate", "endDate"]).optional(),
  validator,
  Controller.getEvents
);

router.delete(
  "/:eventId",
  routeGuard,
  param("eventId").exists(),
  validator,
  Controller.deleteEvent
);

router.put(
  "/:eventId",
  routeGuard,
  param("eventId").exists(),
  body(["startDate", "endDate"]).exists(),
  body(["user", "trainer", "title"]).optional(),
  validator,
  Controller.updateEvent
);

export default router;

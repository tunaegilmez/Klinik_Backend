import express from "express";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import Controller from "./controller.js";
import routeGuard from "..//middlewares/routeGuard.js";

const router = express.Router();

router.post(
  "/signup",
  body(["fullName", "email", "password"]).exists(),
  validator,
  Controller.signup
);

router.post(
  "/login",
  body(["email", "password"]).exists().isString(),
  validator,
  Controller.login
);

router.get(
  "/",
  query(["limit", "skip"]).optional(),
  validator,
  Controller.getUsers
);

router.patch(
  "/updateUserActive/:userId",
  routeGuard,
  param("userId").exists(),
  validator,
  Controller.updateUserActive
);

router.patch(
  "/updateUserPayment/:userId",
  routeGuard,
  param("userId").exists(),
  validator,
  Controller.updateUserPayment
);

router.get("/:userId", routeGuard, validator, Controller.getUserById);

router.get("/checkType", routeGuard, validator, Controller.checkType);

export default router;

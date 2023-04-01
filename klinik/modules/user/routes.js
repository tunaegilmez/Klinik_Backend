import express from "express";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import Controller from "./controller.js";

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

router.get(
  "/:userId",
  param("userId").exists(),
  validator,
  Controller.getUserById
);

export default router;

import express from "express";
import validator from "../middlewares/validator.js";
import { body, query, param } from "express-validator";
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

export default router;

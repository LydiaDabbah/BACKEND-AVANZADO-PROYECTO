import express from "express";
import * as propertyController from "../controllers/propertyController.js";
import { userTokenValidator } from "../middlewares/linkedFieldsValidator/userTokenValidator.js";
import { userIdentityValidator } from "../middlewares/userIdentityValidator.js";
import Property from "../models/Property.js";

const router = express.Router();

router
  .route("/property")
  .post(userTokenValidator, propertyController.create)
  .get(propertyController.propertyFilter);

router
  .route("/property/:id")
  .get(propertyController.readById)
  .put(userIdentityValidator(Property), propertyController.update);

export default router;

import express from "express";
import * as propertyController from "../controllers/propertyController.js";
import { jwtPayload } from "../middlewares/jwtPayload.js";
import { userTokenValidator } from "../middlewares/linkedFieldsValidator/userTokenValidator.js";
import { userIdentityValidator } from "../middlewares/userIdentityValidator.js";
import Property from "../models/Property.js";
import { roleAuthValidator } from '../middlewares/roleAuthValidation.js';


const router = express.Router();

router
  .route("/property")
  .post(userTokenValidator, propertyController.create)
  .get(propertyController.propertyFilter);

router
  .route("/property/:id")
  .get(jwtPayload,roleAuthValidator(["customer", "admin"]),propertyController.readById)
  .put(jwtPayload,userIdentityValidator(Property), propertyController.update);
 

export default router;

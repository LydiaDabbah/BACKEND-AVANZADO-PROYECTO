import express from "express";
import * as messageController from "../controllers/messageController.js";
import { jwtPayload } from "../middlewares/jwtPayload.js";
import { propertyValidator } from "../middlewares/linkedFieldsValidator/propertyValidator.js";
import { userTokenValidator } from "../middlewares/linkedFieldsValidator/userTokenValidator.js";
import { messageFromValidator } from "../middlewares/messageFromValidator.js";

const router = express.Router();

router
  .route("/message")
  .post(
    jwtPayload,
    userTokenValidator,
    propertyValidator,
    messageFromValidator,
    messageController.create
  )
  .get(jwtPayload, messageController.read);

router
  .route("/message/:id")
  .get(jwtPayload, messageController.readById)
  .put(
    jwtPayload,
    userTokenValidator,
    messageController.respond
  );

export default router;

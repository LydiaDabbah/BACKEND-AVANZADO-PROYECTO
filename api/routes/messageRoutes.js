import express from 'express';
import * as messageController from '../controllers/messageController.js'
import { jwtPayload } from '../middlewares/jwtPayload.js';
import { propertyValidator } from '../middlewares/linkedFieldsValidator/propertyValidator.js';
import { userTokenValidator } from '../middlewares/linkedFieldsValidator/userTokenValidator.js';

const router=express.Router();

router.route('/message')
.post(userTokenValidator,propertyValidator,messageController.create) 
.get(jwtPayload,messageController.read)

router.route('/message/:id')
.get(jwtPayload,messageController.readById)




export default router
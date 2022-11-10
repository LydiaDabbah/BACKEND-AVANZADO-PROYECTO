import express from 'express';
import * as messageController from '../controllers/messageController.js'
import { propertyValidator } from '../middlewares/linkedFieldsValidator/propertyValidator.js';
import { userTokenValidator } from '../middlewares/linkedFieldsValidator/userTokenValidator.js';

const router=express.Router();

router.route('/message')
.post(userTokenValidator,propertyValidator,messageController.create) 
.get(messageController.read)

router.route('/message/:id')
.get()




export default router
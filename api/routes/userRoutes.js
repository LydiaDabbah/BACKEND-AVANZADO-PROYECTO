import express from 'express';
import * as userController from '../controllers/userController.js'
import { registerUserValidator } from '../middlewares/registerUserValidator.js';
import{adminAuthValidator} from '../middlewares/adminAuthValidation.js'

const router=express.Router();

router.route('/user/register').post(userController.register) 

router.route('/user/login').post(userController.login) 

router.route('/user').get(adminAuthValidator(['admin','customer']),userController.read)

export default router
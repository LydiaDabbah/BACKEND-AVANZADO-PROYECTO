import express from 'express';
import * as userController from '../controllers/userController.js'
import { registerUserValidator } from '../middlewares/registerUserValidator.js';

const router=express.Router();

router.route('/user/register').post(userController.register) 

router.route('/user/login').post(userController.login) 

export default router
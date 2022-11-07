import express from 'express';
import * as userController from '../controllers/userController.js'

const router=express.Router();

router.route('/user/register').post(userController.register) 

router.route('/user/login').post(userController.login) 

export default router
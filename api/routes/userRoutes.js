import express from 'express';
import * as userController from '../controllers/userController.js'
import { jwtPayload } from '../middlewares/jwtPayload.js';
import { roleAuthValidator } from '../middlewares/roleAuthValidation.js';
import { userIdentityValidator } from '../middlewares/userIdentityValidator.js';
import User from '../models/User.js';


const router=express.Router();

router.route('/user/register').post(userController.register) 

router.route('/user/login').post(userController.login) 

router.route('/user').get(jwtPayload,roleAuthValidator(['admin']),userController.read)

router.route('/user/:id')
.get(jwtPayload,roleAuthValidator(['admin']),userController.readById)
.put(jwtPayload,
    userIdentityValidator(User),
    userController.update)



export default router
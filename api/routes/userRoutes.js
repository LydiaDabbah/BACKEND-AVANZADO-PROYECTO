import express from 'express';
import * as userController from '../controllers/userController.js'
import { roleAuthValidator } from '../middlewares/roleAuthValidation.js';
import { userIdentityValidator } from '../middlewares/userIdentityValidator.js';
import User from '../models/User.js';


const router=express.Router();

router.route('/user/register').post(userController.register) 

router.route('/user/login').post(userController.login) 

router.route('/user').get(roleAuthValidator(['admin']),userController.read)

router.route('/user/:id')
.get(roleAuthValidator(['admin']),userController.readById)
.put(userIdentityValidator(User),userController.update)



export default router
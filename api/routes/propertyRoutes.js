import express from 'express';
import * as propertyController from '../controllers/propertyController.js'

const router=express.Router();

router.route('/property')
.post(propertyController.create) 
.get(propertyController.read)

router.route('/property/:id')
.get(propertyController.readById)
.post(propertyController.update)



export default router
import express from 'express';
import * as messageController from '../controllers/messageController.js'
const router=express.Router();

router.route('/message')
.post(messageController.create) 
.get(messageController.read)

router.route('/property/:id')
.get()
.post()



export default router
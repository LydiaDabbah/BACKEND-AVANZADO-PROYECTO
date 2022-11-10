import Message from "../models/Message.js";
import jwt from 'jwt-simple';
import config from '../config/index.js';
import Property from "../models/Property.js";
import { createGeneric } from "./genericController.js";

const create=createGeneric(Message)
const read= async (req, res) => {
  try {

  const { authorization: token } = req.headers;

  //Si token es null
  if (!token) {
    return res.status(403).json({
      msg: 'Token missing',
    });
  }
   
  const payload = jwt.decode(token, config.jwtSecret);
  const { userId } = payload;

  if(!userId){
    return res.status(403).json({
      msg: 'Token invalid',
    });
  }


  const properties=await Property.find({user:userId})
  const message = await Message.find({property:{$in:properties}}).populate('property','userr').populate('user',['name','lastName','email','phoneNumber'])

    if (message.length===0) {
        return res.status(404).json({
          msg: "The search has 0 results",
        });
      }

    return res.json({
      msg: 'The messages were found succesfully',
      message,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was a problem with the search',
      error,
    });
  }
};




export { create, read };

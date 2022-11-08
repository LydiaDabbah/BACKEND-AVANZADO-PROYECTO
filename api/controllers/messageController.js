import Message from "../models/Message.js";
import jwt from 'jwt-simple';
import config from '../config/index.js';

const create = async (req, res) => {
  try {
  
    const message = await Message.create(req.body);
    return res.json({
      msg: 'The message was sent succesfully',
      message,
    });
  } catch (error) {
   
    return res.status(500).json({
      msg: 'Something went wrong. Please try again later',
      error,
    });
  }
};



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
  console.log(userId)

  
  const message = await Message.find()
  console.log(message)
  
    if (!message) {
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

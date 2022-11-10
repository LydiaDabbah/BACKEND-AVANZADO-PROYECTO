import jwt from 'jwt-simple';
import config from '../config/index.js';
import { jwtPayload } from '../jwtPayload.js';
import User from '../models/User.js';

const roleAuthValidator = (roles) =>async (req, res, next) => {
 
  /*const { authorization: token } = req.headers;


  if (!token) {
    return res.status(403).json({
      msg: 'Token missing',
    });
  }*/
  const payload=jwtPayload(req)
  console.log(payload)
  
  try {
   
    //const payload = jwt.decode(token, config.jwtSecret);
 
    const { userId,role } = payload;

    if (!userId || !role) {
      return res.status(403).json({
        msg: 'InvalidToken',
      });
    }


    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({
        msg: 'InvalidToken',
      });
    }

    if (roles.indexOf(role)=== -1) {
    //if (role!==roleReq){
      return res.status(403).json({
        msg: 'Permission Denied',
      });
    }
 
    next();
  } catch (error) {
   
    return res.status(403).json({
      msg: 'Token inválido',
      error
    });
  }
};

export { roleAuthValidator };
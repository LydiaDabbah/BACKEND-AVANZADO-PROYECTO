import jwt from 'jwt-simple';
import config from '../config/index.js';
import User from '../models/User.js';

const adminAuthValidator = (roles) =>async (req, res, next) => {
 
  const { authorization: token } = req.headers;


  if (!token) {
    return res.status(403).json({
      msg: 'Token missing',
    });
  }

  try {
   
    const payload = jwt.decode(token, config.jwtSecret);

    const { userId,role } = payload;

    if (!userId || !role) {
      return res.status(403).json({
        msg: 'InvalidToken1',
      });
    }


    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({
        msg: 'InvalidToken2',
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

export { adminAuthValidator };
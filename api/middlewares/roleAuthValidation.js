

import User from '../models/User.js';

const roleAuthValidator = (roles) =>async (req, res, next) => {
  
  try {
 
    const { userId,role } = req.payload;// se le envio con el middleware de jwtPayload

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
import jwt from 'jwt-simple';
import config from '../../config/index.js';
import User from '../../models/User.js';

// valida que el usuario que viene en el body sea el que en realidad lo mando. eso lo hace con un token
const userTokenValidator = async (req, res, next) => {
 
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(403).json({
      msg: 'Token missing',
    });
  }

  try {
   
    const payload = jwt.decode(token, config.jwtSecret);
    const { userId } = payload;

    if (!userId) {
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

    req.body.user=userId// para asegurar que el que manda el mensaje sea el que se registra en el mensaje

    next();

  } catch (error) {
   
    return res.status(403).json({
      msg: 'Token inválido',
      error
    });
  }
};

export { userTokenValidator };
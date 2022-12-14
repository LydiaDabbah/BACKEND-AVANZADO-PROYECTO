
import User from '../../models/User.js';

// valida que el usuario que viene en el body sea el que en realidad lo mando. eso lo hace con un token
const userTokenValidator = async (req, res, next) => {
 

  try {
   
    
    const { userId } = req.payload;

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
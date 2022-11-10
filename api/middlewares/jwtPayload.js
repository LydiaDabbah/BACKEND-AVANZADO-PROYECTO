import jwt from 'jwt-simple';
import config from '../config/index.js';


// valida que el usuario que viene en el body sea el que en realidad lo mando. eso lo hace con un token
const jwtPayload= (req,res,next) => {
 
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(403).json({
      msg: 'Token missing',
    });
  }

  try {
   
    const payload = jwt.decode(token, config.jwtSecret);
    if (payload) req.payload=payload
    next()
      
  
  } catch (error) {
   return res.status(403).json({
      msg: 'Token inválido',
      error
    });
  }
};

export { jwtPayload };
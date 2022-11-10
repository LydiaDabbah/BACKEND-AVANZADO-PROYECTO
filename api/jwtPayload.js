import jwt from 'jwt-simple';
import config from './config/index.js';


// valida que el usuario que viene en el body sea el que en realidad lo mando. eso lo hace con un token
const jwtPayload= (req) => {
 
  const { authorization: token } = req.headers;

  if (!token) {
    return undefined
  }

  try {
   
    const payload = jwt.decode(token, config.jwtSecret);
    if (payload) return payload
      
  
  } catch (error) {
    return "error"
  }
};

export { jwtPayload };
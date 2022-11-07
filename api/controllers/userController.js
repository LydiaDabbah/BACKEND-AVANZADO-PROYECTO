import  User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'
import config from '../config/index.js'

const create=async(req,res)=>{
    try{
        const user=await User.create(req.body)

        return res.json({
            msg:"The user was created succesfully",
            user
        })

    }catch(error){
        return res.status(500).json({
            msg: 'Error al crear item',
            error,
         });
    }
}  



const register = async (req, res) => {
    try {
      const hashed = await bcrypt.hash(req.body.password, 10);
  
      req.body.password = hashed;
  
      const user = await User.create(req.body);
  
      user.password = undefined;// para que no regrese la contraseña en json como respuesta
  
      return res.json({
        msg: "The user was created succesfully",
        user,
      });

    } catch (error) {
      return res.status(500).json({
        msg: 'There was an error with your registration. Please try again',
        error,
      });
    }
  };

  const login = async (req, res) => {

    
    const { body } = req;

    if (!body.password || !body.email) { // revisar que cuente con usuario y password
      return res.status(400).json({
        msg: 'Email and password required',
      });
    }
    try {
      const user = await User.findOne({
        email: body.email,
      });
    
      if (!user) { // revisar que el emil este registrado en la BD
        return res.status(403).json({
          msg: 'Invalid credentials',
        });
      }
    
      const isValid = await bcrypt.compare(body.password, user.password); // compara las passwords
    
      if (!isValid) {
        return res.status(403).json({
          msg: 'Invalid credentials',
        });
      }
    
      const payload = {
        userId: user.id,
      };
    
      const token = jwt.encode(payload, config.jwtSecret);// jwtSecret esta en .env
    
      return res.json({
        msg: 'Login successfull',
        token,
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'Error while trying to login',
        error,
      });
    }
   };
   


  

export {create,register,login}
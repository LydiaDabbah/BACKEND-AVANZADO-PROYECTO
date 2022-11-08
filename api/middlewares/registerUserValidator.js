import joi from 'joi';
 
const registerUserValidator = async (req, res, next) => {

 
 const userSchema = joi.object({ // object porque va a ser un objeto lo que valida. le pasas el mismo schema del de user que quieres validar
   name: joi.string().required(),
   email: joi.string().email().required()
              .messages({
                'string.email': `"a" should be a type of 'text'`
              })            
   ,

   password:joi.string()
                .alphanum()
                .min(8)
                .required(),
    
   role: joi.string().valid('admin','customer')
            .required()
            .messages({
              'string.valid': `"a" should be a type of 'text'`
            })    
            
 })

 
 try {
   await userSchema.validateAsync(req.body);
   next(); // si todo esta bien se va al siguiente middleware
   
 } catch (error) {
   return res.status(400).json({
     msg: error.details[0].message,
     // quite el error porque me da demasiada info
   });
 }
};

export {registerUserValidator}
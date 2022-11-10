import joi from 'joi';
 
const registerUserValidator = async (req, res, next) => {

 
 const userSchema = joi.object({ 
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
   next(); 
   
 } catch (error) {
   return res.status(400).json({
    
    error
   
   });
 }
};

export {registerUserValidator}

import User from "../models/User.js";

const userIdentityValidator=(Model)=> async (req, res,next) => {
    
   const {id}= req.params

    console.log(Model.modelName)
    try {

   const { userId } = req.payload;
   
   if (!userId) {
    return res.status(403).json({
      msg: 'InvalidToken',
    });
  }

    const model= await Model.findById(id)
    console.log(model)
    console.log(Model.modelName==='User')

    

    let user

    if (Model.modelName==='User'){
      user=model._id.toString()
    }else{
      user =model.user.toString()
    }
    
    console.log(userId)
   
   
    if (user!==userId){
      return res.status(404).json({
          msg: "You dont have permission to perform this action",
        });  
  }
 
    /*if (Model===User&&_id.equals(userId)===false){
        return res.status(404).json({
            msg: "You dont have permission to perform this action",
          });  
    }
    if (Model !==User && user.equals(userId)===false){
      return res.status(404).json({
          msg: "You dont have permission to perform this action",
        });  
  }*/
    
    next()

    } catch (error) {
      return res.status(500).json({
        msg: 'Invalid We had a problem. Please try later',
        error,
      });
    }
  };

  export {userIdentityValidator}
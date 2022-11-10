import { jwtPayload } from "../jwtPayload.js";

const userIdentityValidator=(Model)=> async (req, res,next) => {
    
   const {id}= req.params
   const payload=jwtPayload(req)
    
    try {

   const { userId } = payload;
   
   if (!userId) {
    return res.status(403).json({
      msg: 'InvalidToken',
    });
  }
    const model= await Model.findById(id)
    //const {_id}= model
    const{user}=model
   
    if (user.equals(userId)===false){
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

import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
  name:{ type: String,
        required:true} ,
  lastName: String,
  email:{ type: String,
         required:true,
         unique: true} ,
  phoneNumber:Number,
  password:{ type: String,
            required:true} 
});
 export default mongoose.model('User', userSchema); 
 
 
 

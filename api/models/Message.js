import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

 user:{ // el que la manda
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
 },
 property:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Property",
   require:true
 },

 messages:[
   { 
      from: {
      type:mongoose.Schema.Types.ObjectId,
       ref:"User",
       require:true,
      },
      message:{
         type:String,
      require:true
   }
   }
  
],

 prevMessage:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Message"
 }



});

export default mongoose.model("Message", messageSchema);

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

 message:{
    type:String,
    require:true
 }



});

export default mongoose.model("Message", messageSchema);

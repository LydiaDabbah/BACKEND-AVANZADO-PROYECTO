import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

 contact:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
 },

 message:{
    type:String,
    require:true
 }

});

export default mongoose.model("Message", messageSchema);

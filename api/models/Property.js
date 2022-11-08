import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  streetNumber: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },

  province: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["sale", "rent"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomCount: {
    type: Number,
    required: true,
  },
  
  images: [{
    type: String,
    require:true
 }
 ],
  
   

});

export default mongoose.model("Property", propertySchema);

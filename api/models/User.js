import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  birthDate: {
    type: Date
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    required: true,
    default: "user",
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  references: [
    {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
  ],

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive:{
    type: Boolean,
    default: true,
   }
 /* isVerified: {
    type: Boolean,
    default: false,
  },*/
});

export default mongoose.model("User", userSchema);

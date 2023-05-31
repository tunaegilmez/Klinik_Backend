import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: [true, "Please provide a name"],
      },
      email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
      },
      password: {
        type: String,
        minlength: [6, "Please provide a password with min length 6"],
        required: [true, "Please provide a password"],
      },
      phone: String,
      gender: String,
      role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      packageType: {
        type: String,
        default: "0",
        enum: ["0", "8", "12"],
      },
    },
    { timestamps: true }
  )
);

export default {
  User,
};

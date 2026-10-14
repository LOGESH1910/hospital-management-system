import mongoose, { Schema, model } from "mongoose";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: ["PATIENT", "DOCTOR", "ADMIN"],
      default: "PATIENT",
    },
    profileImage: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Doctor-specific fields
    specialization: {
      type: String,
      trim: true,
    },
    qualification: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    department: {
      type: String,
      trim: true,
    },
    consultationFee: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      default: "",
    },
    availability: {
      type: String,
      default: "",
    },
    approvalStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

export default model("User", userSchema);
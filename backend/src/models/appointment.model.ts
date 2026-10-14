import mongoose, { Schema, model } from "mongoose";

const appointmentSchema: Schema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"],
      default: "PENDING",
    },
    consultationFee: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
    transactionId: {
      type: String,
      default: "",
    },
    paymentDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
appointmentSchema.index({ patient: 1, status: 1 });
appointmentSchema.index({ doctor: 1, date: 1, status: 1 });
appointmentSchema.index({ date: 1 });

export default model("Appointment", appointmentSchema);
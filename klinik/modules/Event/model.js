import mongoose from "mongoose";

const Event = mongoose.model(
  "Event",
  new mongoose.Schema(
    {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      trainer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      title: { type: String, required: false },
    },
    { timestamps: true }
  )
);

export default {
  Event,
};

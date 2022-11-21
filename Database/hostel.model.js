import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    rating: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
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
    faclities: [
      {
        type: String,
        required: true,
      },
    ],
    warden: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      required: false,
    },
    userBooked: {
      _id: String,
      name: String,
      email: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const hostelModel = mongoose.model("hostel", hostelSchema);

export default hostelModel;

import mongoose from "mongoose";
import ISeat from "interfaces/seat";

const seatSchema = new mongoose.Schema<ISeat>({
  bookerName: {
    type: String,
  },
  seatNo: {
    type: Number,
    required: true,
    unique: true,
  },
  isBooked: {
    type: Boolean,
    required: true,
  },
});

const Seat = mongoose.model<ISeat>("seats", seatSchema);
export default Seat;

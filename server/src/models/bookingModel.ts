import mongoose from "mongoose";
import IBooking from "interfaces/booking";

const bookingSchema = new mongoose.Schema<IBooking>({
  bookerName: {
    type: String,
  },
  slotNo: {
    type: Number,
    required: true,
    unique: true,
  },
  isBooked: {
    type: Boolean,
    required: true,
  },
});

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;

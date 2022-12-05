import Booking from "models/bookingModel";
import IBooking, { IBook } from "interfaces/booking";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export const addBook = async (obj: IBook) => {
  try {
    return await Booking.create({
      showName: obj.showName,
      bookerName: "",
      dateTime: obj.dateTime,
      isBooked: false,
    });
  } catch (error) {
    return error;
  }
};

export const getAllBookings = async () => {
  try {
    return await Booking.find();
  } catch (error) {
    return error;
  }
};

export const updateBookings = async (obj: IBooking) => {
  try {
    return await Booking.findByIdAndUpdate(obj.id, {
      bookerName: obj.bookerName,
      isBooked: true,
    });
  } catch (error) {
    return error;
  }
};

export const deleteBookingName = async (id: string) => {
  try {
    return await Booking.findByIdAndUpdate(id, {
      bookerName: "",
      isBooked: false,
    });
  } catch (error) {
    return error;
  }
};

export const deletebookingtiming = async (id: string) => {
  try {
    return await Booking.findByIdAndDelete(id);
  } catch (error) {
    return error;
  }
};

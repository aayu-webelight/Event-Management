import Booking from "models/bookingModel";
import IBooking from "interfaces/booking";

export const addBook = async (input: number) => {
  try {
    const previousentries: IBooking[] | any = await getAllBookings();
    const startingNumber = previousentries.length;
    for (let i = startingNumber + 1; i <= startingNumber + input; i++) {
      await Booking.create({
        bookerName: "",
        slotNo: i,
        isBooked: false,
      });
    }
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

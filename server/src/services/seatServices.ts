import Seat from "models/seatModel";
import ISeat from "interfaces/seat";

export const addSeat = async (totalSeats: number) => {
  try {
    const previousseats: ISeat[] | any = await getAllSeats();
    const totalSeat = previousseats.length;
    for (let i = totalSeat + 1; i <= totalSeat + totalSeats; i++) {
      await Seat.create({
        bookerName: "",
        seatNo: i,
        isBooked: false,
      });
    }
  } catch (error) {
    return error;
  }
};

export const getAllSeats = async () => {
  try {
    return await Seat.find();
  } catch (error) {
    return error;
  }
};

export const updateSeatBooking = async (obj: ISeat) => {
  try {
    return await Seat.findByIdAndUpdate(obj.id, {
      bookerName: obj.bookerName,
      isBooked: true,
    });
  } catch (error) {
    return error;
  }
};

export const cancelSeatBooking = async (id: string) => {
  try {
    console.log(id);
    return await Seat.findByIdAndUpdate(id, {
      bookerName: "",
      isBooked: false,
    });
  } catch (error) {
    return error;
  }
};

export const deleteSeats = async (seats: number) => {
  try {
    const previousseats: ISeat[] | any = await getAllSeats();
    const totalSeat = previousseats.length;
    for (let i = totalSeat; i > totalSeat - seats; i--) {
      await Seat.deleteOne({
        seatNo: i,
      });
    }
  } catch (error) {
    return error;
  }
};

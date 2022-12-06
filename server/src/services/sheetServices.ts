import Sheet from "models/sheetModel";
import ISheet from "interfaces/sheetInterface";

export const addSheet = async (totalSeats: number) => {
  try {
    const previousSheets: ISheet[] | any = await getAllSheets();
    const totalSeat = previousSheets.length;
    for (let i = totalSeat + 1; i <= totalSeat + totalSeats; i++) {
      await Sheet.create({
        bookerName: "",
        sheetNo: i,
        isBooked: false,
      });
    }
  } catch (error) {
    return error;
  }
};

export const getAllSheets = async () => {
  try {
    return await Sheet.find();
  } catch (error) {
    return error;
  }
};

export const updateSheetBooking = async (obj: ISheet) => {
  try {
    return await Sheet.findByIdAndUpdate(obj.id, {
      bookerName: obj.bookerName,
      isBooked: true,
    });
  } catch (error) {
    return error;
  }
};

export const cancelSheetBooking = async (id: string) => {
  try {
    return await Sheet.findByIdAndUpdate(id, {
      bookerName: "",
      isBooked: false,
    });
  } catch (error) {
    return error;
  }
};

export const deleteSheets = async (seats: number) => {
  try {
    const previousSheets: ISheet[] | any = await getAllSheets();
    const totalSeat = previousSheets.length;
    for (let i = totalSeat; i > totalSeat - seats; i--) {
      await Sheet.deleteOne({
        sheetNo: i,
      });
    }
  } catch (error) {
    return error;
  }
};

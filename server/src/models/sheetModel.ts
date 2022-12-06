import mongoose from "mongoose";
import ISheet from "interfaces/sheetInterface";

const sheetSchema = new mongoose.Schema<ISheet>({
  bookerName: {
    type: String,
  },
  sheetNo: {
    type: Number,
    required: true,
    unique: true,
  },
  isBooked: {
    type: Boolean,
    required: true,
  },
});

const Sheet = mongoose.model<ISheet>("Sheets", sheetSchema);
export default Sheet;

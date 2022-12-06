import {
  getAllSheet,
  addSheets,
  updateBooking,
  cancelBooking,
  deleteSheet,
} from "controllers/sheetController";
import express from "express";

const sheetRouter = express.Router();

sheetRouter.get("/", getAllSheet);

sheetRouter.post("/", addSheets);

sheetRouter.put("/", updateBooking);

sheetRouter.delete("/", cancelBooking);

sheetRouter.delete("/delete", deleteSheet);

export default sheetRouter;

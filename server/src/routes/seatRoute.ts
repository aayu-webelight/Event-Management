import {
  getAllSeat,
  addSeats,
  updateBooking,
  cancelBooking,
  deleteSeat,
} from "controllers/seatController";
import express from "express";

const seatRouter = express.Router();

seatRouter.get("/", getAllSeat);

seatRouter.post("/", addSeats);

seatRouter.put("/", updateBooking);

seatRouter.delete("/", cancelBooking);

seatRouter.delete("/delete", deleteSeat);

export default seatRouter;

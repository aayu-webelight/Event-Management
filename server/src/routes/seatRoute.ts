import {
  getAllSeat,
  addSeats,
  updateBooking,
  cancelBooking,
  deleteSeat,
} from "controllers/seatController";
import express from "express";
import { auth } from "middleware/auth";

const seatRouter = express.Router();

seatRouter.get("/", getAllSeat);

seatRouter.post("/", auth, addSeats);

seatRouter.put("/", updateBooking);

seatRouter.delete("/", cancelBooking);

seatRouter.delete("/delete", auth, deleteSeat);

export default seatRouter;

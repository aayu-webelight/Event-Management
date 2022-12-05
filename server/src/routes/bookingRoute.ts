import {
  getAll,
  addBooking,
  updateBooking,
  deleteBooking,
  deletebookingtime,
} from "controllers/bookingController";
import express from "express";

const bookingRouter = express.Router();

bookingRouter.get("/", getAll);

bookingRouter.post("/", addBooking);

bookingRouter.put("/", updateBooking);

bookingRouter.delete("/", deleteBooking);

bookingRouter.delete("/delete", deletebookingtime);

export default bookingRouter;

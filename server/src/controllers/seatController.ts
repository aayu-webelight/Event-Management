import { Request, Response } from "express";
import {
  addSeat,
  getAllSeats,
  deleteSeats,
  updateSeatBooking,
  cancelSeatBooking,
} from "services/seatServices";

export const getAllSeat = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await getAllSeats());
  } catch (error) {
    res.status(400).send(error);
  }
};

export const addSeats = async (req: Request, res: Response) => {
  try {
    res.status(201).send(await addSeat(req.body.totalSeats));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    res.status(201).send(await updateSeatBooking(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    res.status(200).send(await cancelSeatBooking(req.body.id));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteSeat = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await deleteSeats(req.body.seatsToDelete));
  } catch (error) {
    res.status(400).send(error);
  }
};

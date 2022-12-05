import { Request, Response } from "express";
import {
  addBook,
  deleteBookingName,
  deletebookingtiming,
  getAllBookings,
  updateBookings,
} from "services/bookingServices";

export const getAll = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await getAllBookings());
  } catch (error) {
    res.status(400).send(error);
  }
};

export const addBooking = async (req: Request, res: Response) => {
  try {
    res.status(201).send(await addBook(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    res.status(201).send(await updateBookings(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await deleteBookingName(req.body.id));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deletebookingtime = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await deletebookingtiming(req.body.id));
  } catch (error) {
    res.status(400).send(error);
  }
};

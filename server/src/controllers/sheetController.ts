import { Request, Response } from "express";
import {
  addSheet,
  getAllSheets,
  deleteSheets,
  updateSheetBooking,
  cancelSheetBooking,
} from "services/sheetServices";

export const getAllSheet = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await getAllSheets());
  } catch (error) {
    res.status(400).send(error);
  }
};

export const addSheets = async (req: Request, res: Response) => {
  try {
    res.status(201).send(await addSheet(req.body.totalSeats));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    res.status(201).send(await updateSheetBooking(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await cancelSheetBooking(req.body.id));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteSheet = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await deleteSheets(req.body.seatsToDelete));
  } catch (error) {
    res.status(400).send(error);
  }
};

import { Request, Response, NextFunction } from "express";
import { appConfig } from "config/appConfig";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const password = req.body.password as string;

    if (password === undefined) {
      throw new Error("Unauthorized");
    }

    if (password == appConfig.password) {
      next();
    } else {
      throw new Error("Wrong Password");
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};

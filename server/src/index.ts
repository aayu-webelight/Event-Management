import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";

import { appConfig } from "config/appConfig";
import bookingRouter from "routes/bookingRoute";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.use("/", bookingRouter);

mongoose.connect(appConfig.mongourl as string, () => {
  console.log("connected to database");
});

app.listen(appConfig.port, () => {
  console.log(`Server is running on PORT ${appConfig.port}`);
});

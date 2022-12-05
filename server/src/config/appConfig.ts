import { config } from "dotenv";

config();

export const appConfig = {
  mongourl: process.env.MONGODB as string,
  port: process.env.PORT || 3001,
};

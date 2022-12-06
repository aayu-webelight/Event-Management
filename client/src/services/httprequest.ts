import { API } from "../config/config";
import axios from "axios";

export const getSlots = async () => {
  const url = API as string;
  return await axios.get(url);
};

export const bookslot = async (method: string, name: string) => {
  const url = API as string;
  return await fetch(url, {
    method: method,
    body: JSON.stringify({
      bookieName: String,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

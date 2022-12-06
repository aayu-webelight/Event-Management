import { API } from "../config/config";
import axios from "axios";

export const getSlots = async () => {
  const url = API as string;
  return await axios.get(url);
};

export const bookslot = async (body: string) => {
  const url = API as string;
  return await fetch(url, {
    method: "PUT",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const cancelSlot = async (body: string) => {
  const url = API as string;
  return await fetch(url, {
    method: "DELETE",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

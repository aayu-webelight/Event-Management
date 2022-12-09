import axios from "axios";
import { appConfig } from "../config/config";

export const getSlots = async () => {
  const url = appConfig.apiURL as string;
  return await axios.get(url);
};

export const bookslot = async (body: string) => {
  const url = appConfig.apiURL as string;
  return await fetch(url, {
    method: "PUT",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const cancelSlot = async (body: string) => {
  const url = appConfig.apiURL as string;
  return await fetch(url, {
    method: "DELETE",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addSlot = async (body: string) => {
  const url = appConfig.apiURL as string;
  return await fetch(url, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const removeSlot = async (body: string) => {
  const url = appConfig.apiURL as string;
  return await fetch(url + "/delete", {
    method: "DELETE",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

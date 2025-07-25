// src/services/api.listing.service.js

import axios from "axios";
import { getApi } from "@/api/api.routes";

// Можно настроить глобальный axios instance, если нужно
const axiosInstance = axios.create({
  baseURL: "/",
  withCredentials: true, // 👈 ЭТО главное — включает отправку и получение cookie]
});
// functions

export const POST_NewListing = async (data) => {
  try {
    console.log("New Listing:", data);
    const url = getApi("listing", "new");
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (err) {
    console.error("Ошибка при создании объявления:", err);
    throw err;
  }
};

export const GET_AllListings = async () => {
  try {
    const url = getApi("listing", "all");
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении списка объявлений:", err);
    throw err;
  }
};
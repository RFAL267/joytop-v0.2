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

export const GET_Listings = async () => {
  try {
    const url = getApi("listing", "all");
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении списка объявлений:", err);
    throw err;
  }
};


export const GET_Locations = async () => {
  try {
    const url = getApi("listing", "locations");
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении списка Locations:", err);
    throw err;
  }
}

export const GET_Types = async () => {
  try {
    const url = getApi("types", "all");
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении списка TypeSell:", err);
    throw err;
  }
};

export const GET_NearbyList = async () => {
  try {
    const url = getApi("listing", "nearby");
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении списка Locations:", err);
    throw err;
  }
}

export const GET_Features = async () => {
  try {
    const url = getApi("listing", "features");
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении списка Features:", err);
    throw err;
  }
}

export const GET_Categories = async () => {
  try {
    const url = getApi("listing", "categories");
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении списка Categories:", err);
    throw err;
  }
}
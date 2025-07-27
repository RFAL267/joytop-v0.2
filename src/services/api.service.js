// src/services/api.service.js

import axios from "axios";
import { getApi } from "@/api/api.routes";

// Можно настроить глобальный axios instance, если нужно
const axiosInstance = axios.create({
  baseURL: "/",
  withCredentials: true, // 👈 ЭТО главное — включает отправку и получение cookie]
});

// =======================
// 🔒 AUTH
// =======================

/**
 * Авторизация пользователя
 * @param {Object} data { email, password }
 */
export const POST_Login = async (data) => {
  const url = getApi("auth", "login");
  return axiosInstance.post(url, data);
};

/**
 * Проверка регистрации
 * @param {Object} data
 */
export const POST_Register = async (data) => {
  const url = getApi("auth", "register");
  return axiosInstance.post(url, data);
};

// =======================
// 📲 SMS
// =======================

/**
 * Отправка кода через SMS
 * @param {Object} data { phone_number }
 */
export const POST_SendSMSCode = async (data) => {
  const url = getApi("sms", "sendCode");
  return axiosInstance.post(url, data);
};

/**
 * Подтверждение SMS-кода
 * @param {Object} data { phone: string, code: string }
 * @returns Promise<{ detail: string }>
 */
export const POST_VerifyCode = async (data) => {
    console.log(data);
    
  const url = getApi("sms", "verifyCode");
  return axiosInstance.post(url, data);
};

// func
export const GET_AllTypes = async () => {
  try {
    const url = getApi("types", "all");
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении списка TypeSell:", err);
    throw err;
  }
};
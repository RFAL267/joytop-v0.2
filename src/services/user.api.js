// src/services/user.api.js

import axios from "axios";
import { getApi } from "@/api/api.routes";

// Настраиваем инстанс
const axiosInstance = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const USER_API = {
  /**
   * Обновление данных профиля пользователя
   * @param {Object} data Частичные данные профиля (имя, контакты, bio и т.д.)
   * @returns {Promise} axios PATCH-запрос
   */
  editProfile: async (data) => {
    const url = getApi("user", "edit_profile");
    return axiosInstance.patch(url, data);
  },

  // 🔽 можно добавлять другие методы
  getProfile: async () => {
    const url = getApi("user", "get_profile");
    return axiosInstance.get(url);
  },

  deleteAccount: async () => {
    const url = getApi("user", "delete_account");
    return axiosInstance.delete(url);
  },

  // и т.д.
};

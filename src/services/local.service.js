// src/services/local.service.js

const USER_KEY = "user_data";

export const LocalService = {
  // Сохранить пользователя
  setUser: (userData) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData.data.user));
  },

  // Получить пользователя
  getUser: () => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Проверка, есть ли пользователь
  hasUser: () => {
    return !!localStorage.getItem(USER_KEY);
  },

  // Обновить часть данных пользователя
  updateUser: (newData) => {
    console.log(newData);
    
    const current = LocalService.getUser();
    if (!current) return;

    const deepMerge = (target, source) => {
      const output = { ...target };
      for (const key in source) {
        if (
          source[key] &&
          typeof source[key] === "object" &&
          !Array.isArray(source[key])
        ) {
          output[key] = deepMerge(target[key] || {}, source[key]);
        } else {
          output[key] = source[key];
        }
      }
      return output;
    };

    const updated = deepMerge(current, newData.data.user);
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
  },


  // Удалить пользователя
  clearUser: () => {
    localStorage.removeItem(USER_KEY);
  }
};

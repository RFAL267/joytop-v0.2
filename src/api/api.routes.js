// src/api/api.routes.js

const BASE_URL = "https://building.ardentsoft.uz/api/website/v1";

const apiRoutes = {
  auth: {
    login: "/auth/login/",
    register: "/auth/register/",
  },
  sms: {
    sendCode: "/send_sms/send-code/",
    verifyCode: "/send_sms/verify-code/",
  },
  user: {
    edit_profile: "/users/me/",
  },
  listing: {
    new: "/listing/",
    all: "/listing/",
  },
  types: {
    all: "/typesell/",
  }
};

const buildFullUrl = (path) => `${BASE_URL}/${path}`.replace(/([^:]\/)\/+/g, "$1");

/**
 * Получить конкретную ссылку по ключам
 * @example getApi("auth", "login")
 */
export const getApi = (...keys) => {
  let path = apiRoutes;
  for (const key of keys) {
    if (!path[key]) throw new Error(`API path not found: ${keys.join(" -> ")}`);
    path = path[key];
  }
  return buildFullUrl(path);
};

/**
 * Получить все пути целиком (в виде объекта с полными URL)
 */
export const getAllApi = () => {
  const resolvePaths = (obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) =>
        typeof value === "string"
          ? [key, buildFullUrl(value)]
          : [key, resolvePaths(value)]
      )
    );

  return resolvePaths(apiRoutes);
};

/**
 * Получить базовый URL
 */
export const getBaseUrl = () => BASE_URL;

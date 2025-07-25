// src/context/user.context.jsx
import React, { createContext, useState, useEffect } from "react";
import { LocalService } from "../services/local.service";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  // Загрузка из localStorage при старте
  useEffect(() => {
    if (LocalService.hasUser()) {
      setUserState(LocalService.getUser());
    }
  }, []);

  const setUser = (userData) => {
    LocalService.setUser(userData);
    setUserState(LocalService.getUser());
  };

  const updateUser = (newData) => {
    LocalService.updateUser(newData);
    setUserState(LocalService.getUser());
  };

  const clearUser = () => {
    LocalService.clearUser();
    setUserState(null);
  };

  const hasUser = LocalService.hasUser();

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        clearUser,
        hasUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

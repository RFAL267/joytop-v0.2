// src/security/security.js
import { LocalService } from "../services/local.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Check_hasUser = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const a = LocalService.hasUser();
    if (!a) {
      navigate("/"); // редирект на главную
    }
  }, []);
  return null; // этот компонент не рендерит ничего
};

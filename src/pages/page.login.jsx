import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/pages/page.auth.css";

import UI_Input from "../ui/ui.input";
import { validateUzbekPhone, normalizePhone } from "../utils/validate.phone";
import { POST_Login } from "../services/api.service";
import { UserContext } from "../context/user.context"; // 👈 Подключаем контекст

const PageLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // 👈 Получаем setUser из контекста

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validate = () => {
    const newErrors = {};

    const phoneError = validateUzbekPhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    if (!formData.password.trim()) {
      newErrors.password = "Пароль обязателен";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const phone = normalizePhone(formData.phone);
      const res = await POST_Login({
        phone: `+${phone}`,
        password: formData.password,
      });

      // ✅ Сохраняем пользователя в контекст
      setUser(res.data);
      console.log(res.data);
      

      // Переход в личный кабинет
      navigate("/panel");
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        "Ошибка входа. Проверьте данные и попробуйте снова.";

      setErrors({ password: msg });
    }
  };

  return (
    <section className="page_auth page_login">
      <div className="wrap">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form_header">
            <h2>Вход</h2>
            <p>Введите номер телефона и пароль для входа.</p>
          </div>

          <div className="row">
            <span>Номер телефона</span>
            <UI_Input
              type="phone"
              placeholder="998 (XX) XXX-XX-XX"
              name="phone"
              value={formData.phone}
              onChange={(value) => handleChange("phone", value)}
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>

          <div className="row">
            <span>Пароль</span>
            <UI_Input
              type="password"
              placeholder="Введите пароль"
              name="password"
              value={formData.password}
              onChange={(value) => handleChange("password", value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="form_footer">
            <button type="submit" className="btn_submit">
              Войти
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PageLogin;

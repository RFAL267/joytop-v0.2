// src/pages/page.register.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/pages/page.auth.css";
import UI_Input from "../ui/ui.input";
import UI_OTP_Field from "../ui/ui.otp_field";
import { useNavigate } from "react-router-dom";
import { validateUzbekPhone, normalizePhone } from "../utils/validate.phone"; // ✅
import { Select } from "antd";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

import {
  POST_SendSMSCode,
  POST_Register,
  POST_VerifyCode,
} from "../services/api.service";
// 
import { LocalService } from "../services/local.service"; // ✅ централизованный сервис



// 
const steps = {
  PHONE: 1,
  OTP: 2,
  PROFILE: 3,
};

const PageRegister = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(steps.PHONE);

const [formData, setFormData] = useState({
  phone: "",
  otp: "",
  fullName: "",
  password: "",
  language: "uz", // ✅ По умолчанию
  createdAt: "",
});

  const [errors, setErrors] = useState({});
  const [otpIsValid, setOtpIsValid] = useState(undefined);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Удаляем ошибку для этого поля
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validatePhone = () => {
    const error = validateUzbekPhone(formData.phone); // ✅
    return error ? { phone: error } : {};
  };

const handleSubmitPhone = async (e) => {
  e.preventDefault();
  const validationErrors = validatePhone();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const phone = normalizePhone(formData.phone);
    const response = await POST_SendSMSCode({ phone });

    // Если пришёл detail — показываем его как информационное сообщение (можно через alert, toast, и т.д.)
    if (response?.data?.detail) {
      console.log("✅", response.data.detail);
    }

    setStep(steps.OTP);
  } catch (err) {
    const detail = err?.response?.data?.detail;

    if (detail) {
      setErrors({ phone: detail }); // Показываем сообщение прямо под полем
    } else {
      setErrors({ phone: "Произошла ошибка. Повторите попытку позже." });
    }
  }
};


  const handleOTPComplete = async (code) => {
    setFormData((prev) => ({ ...prev, otp: code }));

    try {
      const phone = normalizePhone(formData.phone); // ✅
      await POST_VerifyCode({ phone, code });

      setOtpIsValid(true);
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          createdAt: new Date().toISOString(),
        }));
        setStep(steps.PROFILE);
        setOtpIsValid(undefined);
      }, 300);
    } catch (err) {
      const errorList = err?.response?.data?.non_field_errors;
      if (errorList?.[0]) {
        setErrors((prev) => ({ ...prev, otp: errorList[0] }));
      }
      setOtpIsValid(false);
    }
  };

const [userData, setUserData] = useState(null); // ⬅️ для хранения данных от сервера

const handleSubmitProfile = async () => {
  const requiredFields = ["fullName", "password", "language"];
  const validationErrors = {};

  requiredFields.forEach((field) => {
    if (!formData[field]) validationErrors[field] = "Обязательное поле";
  });

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const phone = normalizePhone(formData.phone);
    const res = await POST_Register({
      name: formData.fullName,
      phone: `+${phone}`,
      password: formData.password,
      language: formData.language,
      code: formData.otp,
    });

    // ⬇️ Заменено: сохраняем пользователя через context
    setUser(res.data);

    // ⬇️ Убираем LocalService.setUser (он вызывается внутри setUser)
    // LocalService.setUser(res.data);

    setUserData(res.data.user);
    navigate("/panel");
  } catch (err) {
    console.error("Ошибка регистрации:", err?.response?.data || err);
    const msg = err?.response?.data?.detail || "Ошибка регистрации. Повторите позже.";
    setErrors({ password: msg });
  }
};




useEffect(() => {
  if (userData) {
    // например, отправка аналитики
    console.log("🔎 Пользователь:", userData.user || userData);
  }
}, [userData]);


  const formVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.3 },
  };

  return (
    <section className="page_auth page_register">
      <div className="wrap">
        <form className="form" onSubmit={handleSubmitPhone}>
          <div className="form_header">
            <h2>Регистрация</h2>
            <p>Введите номер телефона, подтвердите OTP и создайте профиль.</p>
          </div>

          <AnimatePresence mode="wait">
            {step === steps.PHONE && (
              <motion.div key="phone" {...formVariants} className="step step_1">
                <div className="step_content">
                  <span>Номер телефона</span>
                  <UI_Input
                    type="phone"
                    placeholder="998 (XX) XXX-XX-XX" // ✅ без плюса
                    name="phone"
                    value={formData.phone}
                    onChange={(value) => handleChange("phone", value)}
                  />
                  {errors.phone && <div className="error">{errors.phone}</div>}
                </div>

                <div className="form_footer">
                  <button type="submit" className="btn_submit">
                    Далее
                  </button>
                </div>
              </motion.div>
            )}

            {step === steps.OTP && (
              <motion.div key="otp" {...formVariants} className="step step_2">
                <div className="step_content">
                  <span>Код подтверждения</span>
                  <UI_OTP_Field
                    length={6}
                    onChange={(code) => {
                      handleChange("otp", code);
                      if (otpIsValid === false) setOtpIsValid(undefined);
                    }}
                    onComplete={handleOTPComplete}
                    isValid={otpIsValid}
                  />
                  {otpIsValid === false && (
                    <div className="error">Неверный код. Попробуйте снова.</div>
                  )}
                </div>

                <div className="form_footer">
                  <button
                    type="button"
                    className="btn_submit"
                    onClick={() => setStep(steps.PHONE)}
                  >
                    Назад
                  </button>
                </div>
              </motion.div>
            )}

            {step === steps.PROFILE && (
              <motion.div key="profile" {...formVariants} className="step step_3">
                <div className="step_content">
                  <div className="row">
                    <span>Имя Профиля</span>
                    <UI_Input
                      type="text"
                      placeholder="Имя профиля"
                      value={formData.fullName}
                      onChange={(value) => handleChange("fullName", value)}
                    />
                    {errors.fullName && <div className="error">{errors.fullName}</div>}
                  </div>

                  <div className="row">
                    <span>Пароль</span>
                    <UI_Input
                      type="password"
                      placeholder="Введите пароль"
                      value={formData.password}
                      onChange={(value) => handleChange("password", value)}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                  </div>

                  <div className="row">
                    <span>Язык</span>
                    <Select
                      defaultValue={formData.language}
                      style={{ width: "100%" }}
                      onChange={(value) => handleChange("language", value)}
                      options={[
                        { label: "Русский", value: "ru" },
                        { label: "O‘zbek", value: "uz" },
                        { label: "English", value: "en" },
                      ]}
                      size="large"
                    />
                    {errors.language && <div className="error">{errors.language}</div>}
                  </div>
                </div>

                <div className="form_footer">
                  <button
                    type="button"
                    className="btn_submit"
                    onClick={handleSubmitProfile}
                  >
                    Завершить
                  </button>
                </div>
              </motion.div>
              )}

          </AnimatePresence>
        </form>
      </div>
    </section>
  );
};

export default PageRegister;

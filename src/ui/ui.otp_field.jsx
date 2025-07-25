import React, { useRef, useState, useEffect } from "react";
import "./css/ui.css";

const UI_OTP_Field = ({
  length = 6,
  onChange,
  onComplete,
  className = "",
  autoFocus = true,
  disabled = false,
  isValid, // 👈 Новый проп
}) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange?.(newValues.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newValues.every((val) => val !== "")) {
      onComplete?.(newValues.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (autoFocus) {
      inputsRef.current[0]?.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`ui-otp-field ${className}`}>
      {values.map((val, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className={`ui-otp-input ${
            isValid === true
              ? "otp-success"
              : isValid === false
              ? "otp-error"
              : ""
          }`}
          value={val}
          disabled={disabled}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          ref={(el) => (inputsRef.current[idx] = el)}
        />
      ))}
    </div>
  );
};

export default UI_OTP_Field;

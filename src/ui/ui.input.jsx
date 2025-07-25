import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./css/ui.css"; 

const UI_Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  id,
  label,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Определяем тип для рендера (для toggle password)
  const renderType = type === "password" && showPassword ? "text" : type;

  // Простейшая маска телефона (примерно +998 (99) 999-99-99)
  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 0) {
      input = input.replace(
        /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
        "+$1 ($2) $3-$4-$5"
      );
    }
    onChange(input);
  };

  const handleChange = (e) => {
    if (type === "phone") {
      handlePhoneChange(e);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`ui_input ${className}`}>
      {label && (
        <label htmlFor={id} className="ui_input_label">
          {label}
        </label>
      )}
      <div className="ui_input_wrapper">
        <input
          type={renderType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          name={name}
          id={id}
          className="ui_input_field"
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="ui_input_toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default UI_Input;

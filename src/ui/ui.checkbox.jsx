import React, { useState, useEffect } from "react";
import "./css/ui.css"; // Подключаем твои стили, можно вынести стили туда же

export const UI_Checkbox = ({
  checked = false,
  onChange,
  disabled = false,
  label = "",
  className = "",
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleChecked = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange && onChange(newChecked);
  };

  // Обновляем внутреннее состояние, если изменяется пропс
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <label
      className={`ui-checkbox ${isChecked ? "checked" : ""} ${
        disabled ? "disabled" : ""
      } ${className}`}
      onClick={toggleChecked}
    >
      {label && <span className="ui-checkbox-label">{label}</span>}
      <span className="ui-checkbox-track">
        <span className="ui-checkbox-thumb" />
      </span>
    </label>
  );
};

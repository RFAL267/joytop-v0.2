import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./css/ui.css";

import { ChevronDown } from "lucide-react";
const SelectContext = createContext();

export const UI_SelectRoot = ({
  value,
  onChange,
  children,
  className = "",
  placeholder = "Select an option",
  icon = null,
  defaultValue = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Инициализируем selectedValue либо value, либо defaultValue, либо null
  const [selectedValue, setSelectedValue] = useState(value ?? defaultValue);

  const containerRef = useRef(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const closeSelect = () => setIsOpen(false);

  const handleSelect = (option) => {
    setSelectedValue(option);
    onChange && onChange(option);
    closeSelect();
  };

  // Закрытие по клику вне селекта
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        closeSelect();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Если value изменился извне, обновляем selectedValue
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);
// ▼
  return (
    <SelectContext.Provider
      value={{ selectedValue, handleSelect, isOpen, toggleOpen }}
    >
      <div ref={containerRef} className={`ui-select-root ${className}`}>
        <button
          type="button"
          className="ui-select-trigger"
          onClick={toggleOpen}
        >
          {/* Иконка слева от текста */}
          {icon && <span className="ui-select-icon">{icon}</span>}
          {selectedValue ? selectedValue.label : placeholder}
          <span className={`ui-select-arrow ${isOpen ? "open" : ""}`}><ChevronDown/></span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="ui-select-dropdown"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SelectContext.Provider>
  );
};

export const UI_SelectItem = ({ value, label, disabled = false }) => {
  const { selectedValue, handleSelect } = useContext(SelectContext);

  const isSelected = selectedValue?.value === value;

  return (
    <button
      type="button"
      className={`ui-select-item ${isSelected ? "selected" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={() => !disabled && handleSelect({ value, label })}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

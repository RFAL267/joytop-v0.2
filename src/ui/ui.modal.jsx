import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./css/ui.css";

export const UI_Modal = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  className = "",
  closeOnOutsideClick = true,
  showClose = true,
}) => {
  const modalRef = useRef(null);

  // Закрытие при клике вне модалки
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        closeOnOutsideClick &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        onClose && onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeOnOutsideClick, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          className="ui-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="modal"
            ref={modalRef}
            className={`ui-modal ${className}`}
            initial={{ opacity: 0, y: +30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: +30 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="ui-modal-header">
              <h2 className="ui-modal-title">{title}</h2>
              {showClose && (
                <button
                  type="button"
                  className="ui-modal-close"
                  onClick={onClose}
                  aria-label="Close"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Body */}
            <div className="ui-modal-body">{body}</div>

            {/* Footer */}
            {footer && <div className="ui-modal-footer">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React, { createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./css/ui.css";

const AccordionContext = createContext();

export const UI_AccordionRoot = ({
  type = "single",
  children,
  className = ""
}) => {
  const [openItems, setOpenItems] = React.useState([]);

  const toggleItem = (id) => {
    if (type === "single") {
      setOpenItems((prev) => (prev[0] === id ? [] : [id]));
    } else {
      setOpenItems((prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id]
      );
    }
  };

  const isItemOpen = (id) => openItems.includes(id);

  return (
    <AccordionContext.Provider value={{ isItemOpen, toggleItem }}>
      <div className={`ui-accordion-root ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

export const UI_AccordionItem = ({
  id,
  title,
  content,
  initiallyOpen = false
}) => {
  const { isItemOpen, toggleItem } = useContext(AccordionContext);

  React.useEffect(() => {
    if (initiallyOpen) {
      toggleItem(id);
    }
  }, [id, initiallyOpen, toggleItem]);

  const open = isItemOpen(id);

  return (
    <div className="ui-accordion">
      <button
        className={`ui-accordion__trigger ${open ? "active" : ""}`}
        onClick={() => toggleItem(id)}
      >
        {title}
        <span className="ui-accordion__icon">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="ui-accordion__content"
          >
            <div className="ui-accordion__content-inner">
              <p>{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

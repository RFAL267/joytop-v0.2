import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Languages,
  Wallet,
  UserCircle,
  User,
  Grid2x2,
  BriefcaseBusiness,
  MessageCircleMore,
  Heart,
  LogOut,
} from "lucide-react";
import classNames from "classnames";
import "../css/components/header.top.css";
import { Modal, Dropdown } from "antd";
import { UserContext } from "../context/user.context";

const LANGUAGES = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
  { code: "uz", label: "Uzbekcha" },
];

const NAV_ITEMS = [
  { label: "Мой профиль", path: "/panel", icon: <User size={16} /> },
  { label: "Мои объявления", path: "/panel/listings", icon: <Grid2x2 size={16} /> },
  { label: "Мой кошелек", path: "/panel/wallet", icon: <Wallet size={16} /> },
  { label: "Услуги и тарифы", path: "/panel/services", icon: <BriefcaseBusiness size={16} /> },
  { label: "Сообщения", path: "/panel/chat", icon: <MessageCircleMore size={16} /> },
  { label: "Избранное", path: "/panel/favorites", icon: <Heart size={16} /> },
];

const HeaderTop = () => {
  const navigate = useNavigate();
  const { user, clearUser, isAuthenticated } = useContext(UserContext);

  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ru");

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  const userMenuItems = [
    ...NAV_ITEMS.map((item) => ({
      key: item.path,
      label: item.label,
      icon: item.icon,
      onClick: () => navigate(item.path),
    })),
    { type: "divider" },
    {
      key: "logout",
      danger: true,
      label: "Выйти",
      icon: <LogOut size={16} />,
      onClick: handleLogout,
    },
  ];

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setIsLangModalOpen(false);
  };

  return (
    <>
      <div className="top_header">
        <div className="container">
          <div className="wrap">
            <div className="left_bar">
              <button className="btn btn_lang" onClick={() => setIsLangModalOpen(true)}>
                <Languages />
                <span>{LANGUAGES.find((lang) => lang.code === selectedLanguage)?.label || "Русский"}</span>
              </button>
            </div>

            {isAuthenticated ? (
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <button className="btn_user">
                  <UserCircle /> {user?.name || "Профиль"}
                </button>
              </Dropdown>
            ) : (
              <button className="btn_user" onClick={() => navigate("/login")}>
                <UserCircle /> Войти
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Модалка языка */}
      <Modal
        title="Выбор языка"
        open={isLangModalOpen}
        onCancel={() => setIsLangModalOpen(false)}
        footer={null}
        centered
      >
        <div className="modal_lang">
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              className={classNames("lang_btn", { active_lang: selectedLanguage === code })}
              onClick={() => handleLanguageSelect(code)}
              style={{ display: "block", width: "100%", marginBottom: 8 }}
            >
              {label}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default HeaderTop;

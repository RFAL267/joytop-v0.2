import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SquarePlus } from "lucide-react";
import classNames from "classnames";
import "../css/components/header.css";

import HeaderTop from "./header.top";
import { UserContext } from "../context/user.context"; // ← добавлено

const NAV_LINKS = [
  { label: "Главная", path: "/" },
  { label: "Каталог", path: "/catalog" },
  { label: "Поиск по карте", path: "/map" },
  { label: "Услуги", path: "/services" },
  { label: "Партнеры", path: "/partners" },
  { label: "Поддержка", path: "/support" },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useContext(UserContext); // ← получаем статус авторизации

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleAddClick = () => {
    if (isAuthenticated) {
      navigate("/panel/new/listing"); // путь куда добавляют объявление
    } else {
      navigate("/register"); // редиректим на логин если не авторизован
    }
  };

  return (
    <header className="main_header">
      <HeaderTop />
      <div className="container">
        <div className="menu">
          <div className="left">
            <span className="logo">JOYTOP</span>
            <nav className="nav_list">
              {NAV_LINKS.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={classNames({ active: isActive(path) })}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="r_bar">
            <div className="user_options">
              <button className="btn_add" onClick={handleAddClick}>
                <SquarePlus size={20} /> Добавить Объявление
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

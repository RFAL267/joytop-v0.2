import { useNavigate, useLocation } from "react-router-dom";
import {
  User,
  SquareArrowLeft,
  Grid2x2,
  Wallet,
  BriefcaseBusiness,
  Heart,
  LogOut,
  MessageCircleMore
} from "lucide-react";

import "../../css/panel/panel.sidebar.css";

const NAV_ITEMS = [
  { label: "Мой профиль", path: "/panel", icon: User },
  { label: "Мои объявления", path: "/panel/listings", icon: Grid2x2 },
  { label: "Мой кошелек", path: "/panel/wallet", icon: Wallet },
  { label: "Услуги и тарифы", path: "/panel/services", icon: BriefcaseBusiness },
  { label: "Сообшения", path: "/panel/chat", icon: MessageCircleMore },
  { label: "Избранное", path: "/panel/favorites", icon: Heart },
];

const PanelSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => navigate(path);

  const logOut = () => {
    // TODO: Реализовать выход из аккаунта
    console.log("Logging out...");
  };

  return (
    <aside className="panel_sidebar">
      <div className="sidebar_header">
        <button className="back_btn" onClick={() => handleNavigate("/")}>
          <SquareArrowLeft /> Вернуться на сайт
        </button>
      </div>

      <nav className="sidebar_nav">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <button
            key={path}
            onClick={() => handleNavigate(path)}
            className={location.pathname === path ? "active" : ""}
          >
            <Icon /> {label}
          </button>
        ))}

        <button onClick={logOut}>
          <LogOut /> Выйти
        </button>
      </nav>
    </aside>
  );
};

export default PanelSidebar;

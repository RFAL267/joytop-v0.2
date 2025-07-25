import "../css/components/footer.css";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
// Icons
import IconWhatsapp from "../components/icons/icon.whatsapp";
import IconVk from "../components/icons/icon.vk";
import IconTelegram from "../components/icons/icon.telegram";
import IconYoutube from "../components/icons/icon.youtube";
import IconInstagram from "../components/icons/icon.instagram";
// img
import badgeAppStore from "../assets/img/app_store.webp";
import badgePlayMarket from "../assets/img/play_market.webp";

const navLinks1 = [
  { label: "Главная", path: "/" },
  { label: "Каталог", path: "/catalog" },
  { label: "Поиск по карте", path: "/map" },
  { label: "Услуги", path: "/services" },
  { label: "Партнеры", path: "/partners" },
  { label: "Поддержка", path: "/support" },
];
const navLinks2 = [
  { label: "О нас", path: "/about" },
  { label: "Правила безопасности", path: "/help/safety" },
  { label: "Условия использования", path: "/help/terms" },
  { label: "Политика конфиденциальности", path: "/help/privacy" },
  { label: "Реклама на сайте", path: "/advertising" },
  { label: "Карта регионов", path: "/regions_map" },
];
const Footer = () => {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <footer className="main_footer">
      {/* Основная часть */}
      <div className="footer_main">
        <div className="container">
          <div className="gr">
            <nav className="nav_bar" aria-label="Основная навигация">
              <ul>
                {navLinks1.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      title={label}
                      className={classNames({ active: isActive(path) })}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul>
                {navLinks2.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      title={label}
                      className={classNames({ active: isActive(path) })}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <section className="app_info">
              <h2>JOYTOP</h2>
              <p>С тобой на жизненном пути</p>
              <div className="app_links">
                <a href="#" title="Скачать в App Store" rel="noopener noreferrer">
                  <img src={badgeAppStore} alt="Скачать JOYTOP в App Store" />
                </a>
                <a href="#" title="Скачать в Play Market" rel="noopener noreferrer">
                  <img src={badgePlayMarket} alt="Скачать JOYTOP в Play Market" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Контакты и информация */}
      <div className="info">
        <div className="container">
          <address className="wrap">
            <span itemProp="telephone">+998(99)123-45-67</span>
            <span itemProp="email">joytop.support@gmail.com</span>
            <div className="social_links" aria-label="Социальные сети">
              <a href="#" title="YouTube" rel="noopener noreferrer"><IconYoutube /></a>
              <a href="#" title="Instagram" rel="noopener noreferrer"><IconInstagram /></a>
              <a href="#" title="VK" rel="noopener noreferrer"><IconVk /></a>
              <a href="#" title="WhatsApp" rel="noopener noreferrer"><IconWhatsapp /></a>
              <a href="#" title="Telegram" rel="noopener noreferrer"><IconTelegram /></a>
            </div>
          </address>

          <section className="down">
            <span>
              © 2025 <strong>JoyTop</strong>. Все права защищены. Платформа JoyTop предоставляет удобный сервис для размещения и поиска объявлений о продаже, аренде и покупке недвижимости в Узбекистане. Мы объединяем продавцов и покупателей на одной площадке, делая процесс поиска жилья или коммерческой недвижимости максимально удобным и безопасным.
            </span>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

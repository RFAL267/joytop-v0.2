// page.services.jsx
import "../css/pages/page.services.css";
import LayoutMain from "../components/layout.main";
import { Check } from "lucide-react";
import { Divider, Button, Tabs } from "antd";

const TARIFFS = [
  {
    id: 1,
    title: "Тариф-1",
    subtitle: "4x больше просмотров",
    features: [
      { label: "Топ-объявление", t: "на 3 дня", active: true },
      { label: "Выделение", t: "", active: false },
      { label: "VIP-объявления", t: "", active: false },
    ],
    price: "15 000 UZS",
  },
  {
    id: 2,
    title: "Тариф-2",
    subtitle: "8x больше просмотров",
    features: [
      { label: "Топ-объявление", t: "на 7 дней", active: true },
      { label: "Выделение", t: "", active: true },
      { label: "VIP-объявления", t: "", active: false },
    ],
    price: "50 000 UZS",
  },
  {
    id: 3,
    title: "Турбо продажа",
    subtitle: "30x больше просмотров",
    features: [
      { label: "Топ-объявление", t: "на 30 дней", active: true },
      { label: "Выделение + приоритет", t: "", active: true },
      { label: "VIP-объявления", t: "на 7 дней", active: true },
    ],
    price: "220 000 UZS",
  },
];

// Список описаний услуг
const SERVICE_TABS = [
  {
    key: "1",
    label: "Топ-объявление",
    title: "Что такое Топ-объявление?",
    description:
      "С этой услугой ваше объявление будет отображаться с периодическим повтором в результатах поиска вместе с другими объявлениями, размещенными в ТОП в той же категории. Также на фото объявления добавляется значок «ТОП», привлекающий внимание и выделяющий его на фоне других. С покупкой набора услуг ваше объявление будет размещаться в ТОП в течение определенного количества дней. Так как объявления, размещенные в ТОП, отображаются в результатах поиска, разные пользователи будут видеть ваше объявление в разных местах и в разное время. Будьте уверены: его увидят в любом случае, особенно если оно соответствует поисковому запросу.",
  },
  {
    key: "2",
    label: "Выделение",
    title: "Что такое Выделение?",
    description:
      "Выделение позволяет визуально отличить ваше объявление среди других — например, изменить цвет фона, рамку или текст. Это привлекает внимание пользователей и увеличивает шанс на клик.",
  },
  {
    key: "3",
    label: "VIP-объявления",
    title: "Что такое VIP-объявления?",
    description:
      "VIP-объявления отображаются в специальном VIP-блоке на главной странице или в результатах поиска. Они получают максимальный приоритет и больше показов по сравнению с обычными объявлениями.",
  },
];

// Компонент строки услуги
const FeatureRow = ({ label, t, active }) => (
  <div className={`row ${active ? "active" : ""}`}>
    <Check />
    <span>
      {label}
      {t ? ` ${t}` : ""}
    </span>
  </div>
);

// Компонент карточки тарифа
const TariffCard = ({ title, subtitle, features, price }) => (
  <div className="card">
    <div className="content">
      <div className="card_header">
        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
      </div>
      <Divider />
      <div className="details">
        {features.map((feature, index) => (
          <FeatureRow key={index} {...feature} />
        ))}
      </div>
    </div>
    <div className="card_footer">
      <Divider />
      <div className="price">{price}</div>
    </div>
  </div>
);

// Главная страница
const PageServices = () => (
  <LayoutMain>
    <section className="page_services">
      <header className="page_header">
        <div className="overlay" />
        <div className="container">
          <h1>Сервисы / Услуги</h1>
        </div>
      </header>

      <main className="wrapper">
        <div className="container">
          {/* Тарифы */}
          <section className="tariffs">
            <div className="section_header">
              <h2>Наборы платных услуг</h2>
              <p>Теперь вам не нужно задумываться, какая услуга сработает лучше для вашего объявления. Нужно только решить, насколько заметным вы хотите его сделать и как быстро желаете заключить сделку!</p>
            </div>
            <div className="cards">
              {TARIFFS.map((tariff) => (
                <TariffCard key={tariff.id} {...tariff} />
              ))}
            </div>
          </section>

          {/* Информация об услугах */}
          <section className="service_infos">
            <h2 className="section_title">Описание услуг</h2>
            <Tabs className="service_tabs" size="large">
              {SERVICE_TABS.map(({ key, label, title, description }) => (
                <Tabs.TabPane tab={label} key={key}>
                  <div className="tab_content">
                    <h3 className="tab_title">{title}</h3>
                    <p className="tab_desc">{description}</p>
                  </div>
                </Tabs.TabPane>
              ))}
            </Tabs>
          </section>
        </div>
      </main>
    </section>
  </LayoutMain>
);

export default PageServices;

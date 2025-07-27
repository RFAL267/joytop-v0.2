import "../../css/panel/panel.listings.css";
import PanelLayout from "../../components/panel/panel.layout";
import { Calendar, Eye, PlusSquare, Search, Trash } from "lucide-react";
import { Tabs, Button, Pagination } from "antd";
import { useState } from "react";
import mockImg from "../../assets/img/4x3.png";
import { useNavigate } from "react-router-dom";

// Моковые данные
const mockListings = Array.from({ length: 10 }, (_, idx) => ({
  id: idx + 1,
  image: mockImg,
  location: "Tashkent - Uchtepa",
  title: "Сдается Квартира Ташкент Учтепа 51-дом 3-этаж",
  price: "2 000 000",
  rating: 4.5,
  pubDate: "01.01.2025",
  views: "999 000",
  type: "На Продажу",
  isVip: false,
}));

// Карточка объявления
const ListingCard = ({ item }) => {
  const { image, title, price, pubDate, views, type, isVip } = item;
  return (
    <div className="card">
      <div className="poster">
        <img src={image} alt={title} />
      </div>

      <div className="content">
        <div className="data">
          <span className="vip">{isVip ? "VIP" : "Без VIP"}</span>
          <span className="title">{title}</span>
          <div className="info_dates">
            <div className="row type">
              {type}
            </div>
            <div className="row pubdate">
              <Calendar /> <span>{pubDate}</span>
            </div>
            <div className="row views">
              <Eye /> <span>{views}</span>
            </div>

          </div>

          <p className="price">{price} UZS/ ежемесячно</p>
        </div>

        <div className="options">
          <Button
            type="primary"
            icon={<Search size={16} />}
            style={{ marginRight: 8 }}
            className="show"
          >
            Показать
          </Button>
          <Button
            type="default"
            danger
            icon={<Trash size={16} />}
            className="delete"
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};

// Основной компонент страницы
const PanelListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const nav = useNavigate();

  const onTabChange = (key) => {
    console.log("Selected tab:", key);
    setCurrentPage(1); // сброс страницы при смене таба
  };

  // Разделение карточек на страницы
  const paginatedListings = mockListings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const tabItems = [
    {
      key: "active",
      label: "Активные",
      children: (
        <>
          <div className="cards">
            {paginatedListings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>

          <div className="pagination" style={{ marginTop: 24, textAlign: "center" }}>
            <Pagination
              current={currentPage}
              total={mockListings.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      ),
    },
    {
      key: "inactive",
      label: "Неактивные",
      children: (
        <div className="cards">
          <p>Нет неактивных объявлений</p>
        </div>
      ),
    },
  ];

  return (
    <PanelLayout>
      <section className="panel_page panel_listings">
        <div className="panel_listings_header">
          <h1 className="panel_title">Мои объявления</h1>
          <button className="btn_add" onClick={()=>nav("/panel/new/listing")}>
            <PlusSquare/> Создать Обявление
          </button>
        </div>
        
        <div className="nav_bar">
          <Tabs
            size="large"
            defaultActiveKey="active"
            items={tabItems}
            onChange={onTabChange}
          />
        </div>
      </section>
    </PanelLayout>
  );
};

export default PanelListings;

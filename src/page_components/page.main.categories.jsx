// page.main.categories.jsx
import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";

// 🔽 Данные категорий (без "Шале")
const categoriesStats = [
  { id: "house", label: "Домы", count: 12891 },
  { id: "apartment", label: "Квартиры", count: 23101 },
  { id: "office", label: "Офисы", count: 10018 },
  { id: "land", label: "Участки", count: 5231 },
  { id: "building", label: "Здания", count: 3234 },
  { id: "villa", label: "Виллы", count: 4775 },
  { id: "shop", label: "Магазины", count: 2877 },
  { id: "room", label: "Хосты", count: 3145 },           // вместо "Комнаты"
  { id: "warehouse", label: "Склады", count: 1592 },
  { id: "holiday_home", label: "Дачи", count: 843 },
  { id: "camp", label: "Лагеря", count: 412 },
  { id: "farm", label: "Фермы", count: 289 },
].filter((cat) => cat.id !== "chalet");


const formatNumber = (num) => num.toLocaleString("ru-RU");

const PageMain_Categories = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="total_categories">
      <div className="container">
        <div className="grid">
          {loading
            ? Array.from({ length: 12 }).map((_, idx) => (
                <Skeleton.Button
                  key={idx}
                  active
                  shape="round"
                  block
                  style={{
                    height: 50,
                    borderRadius: 12,
                    backgroundColor: "var(--white)",
                  }}
                />
              ))
            : categoriesStats.map(({ id, label, count }) => (
                <button key={id} className="card">
                  <span className="cat">{label}</span>
                  <span className="count">{formatNumber(count)}</span>
                </button>
              ))}
        </div>
      </div>
    </div>
  );
};

export default PageMain_Categories;

import React, { useState } from "react";
import "../css/pages/page.catalog.css";
import LayoutMain from "../components/layout.main";
import { Select, InputNumber, Button, Pagination  } from "antd";
import mockImage from "../assets/img/4x3.png";
import ListingsGrid from "../components/listings.grid";

// Моковые данные
const mockListings = Array.from({ length: 20 }, (_, idx) => ({
  id: idx + 1,
  image: mockImage,
  location: "Tashkent - Uchtepa",
  title: "Сдается Квартира Ташкент Учтепа 51-дом 3-этаж",
  price: "2 000 000",
  rating: 4.5,
}));

const locations = [
  { city: "Ташкентская область" },
  { city: "Андижанская область" },
  { city: "Бухарская область" },
  { city: "Джизакская область" },
  { city: "Кашкадарьинская область" },
  { city: "Навоийская область" },
  { city: "Наманганская область" },
  { city: "Самаркандская область" },
  { city: "Сурхандарьинская область" },
  { city: "Сырдарьинская область" },
  { city: "Ферганская область" },
  { city: "Хорезмская область" },
  { city: "Республика Каракалпакстан" },
];

const locationOptions = [
  { label: "Все", value: "" },
  ...locations.map((loc) => ({ label: loc.city, value: loc.city })),
];

const initialFilters = {
  propertyType: "",
  dealType: "",
  location: "",
  priceMin: "",
  priceMax: "",
  rooms: "",
  areaMin: "",
  areaMax: "",
  parking: false,
  furnished: false,
};

const PageCatalog = () => {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const handleApplyFilters = () => {
    alert("Фильтрация еще не реализована");
  };

  return (
    <LayoutMain>
      <section className="page_catalog">
        <div className="container">
          <div className="filter_options">
            <div className="row">
              <FilterSelect
                label="Тип недвижимости"
                name="propertyType"
                value={filters.propertyType}
                options={[
                  { label: "Все", value: "" },
                  { label: "Квартира", value: "apartment" },
                  { label: "Дом", value: "house" },
                  { label: "Коммерческая", value: "commercial" },
                  { label: "Участок", value: "land" },
                ]}
                onChange={handleChange}
              />

              <FilterSelect
                label="Тип сделки"
                name="dealType"
                value={filters.dealType}
                options={[
                  { label: "Все", value: "" },
                  { label: "Продажа", value: "sale" },
                  { label: "Аренда", value: "rent" },
                ]}
                onChange={handleChange}
              />

              <FilterSelect
                label="Количество комнат"
                name="rooms"
                value={filters.rooms}
                options={[
                  { label: "Любое", value: "" },
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3+", value: "3plus" },
                ]}
                onChange={handleChange}
              />

              <FilterSelect
                label="Город"
                name="location"
                value={filters.location}
                options={locationOptions}
                onChange={handleChange}
              />

              <FilterRange
                label="Цена (UZS)"
                minName="priceMin"
                maxName="priceMax"
                minValue={filters.priceMin}
                maxValue={filters.priceMax}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="filter_btns" style={{ display: "flex", gap: "12px" }}>
                <Button onClick={handleReset} size="large">
                  Сбросить
                </Button>
                <Button type="primary" onClick={handleApplyFilters} size="large">
                  Применить
                </Button>
              </div>

            </div>
          </div>
        </div>

        <div className="listings">
          <div className="container">
            <h2>Объявлений найдено 100</h2>
            <ListingsGrid arr={mockListings} />
            <div className="paginator">
              <Pagination size="default" align="center" defaultCurrent={1} total={100}/>
            </div>
          </div>
        </div>
      </section>
    </LayoutMain>
  );
};

export default PageCatalog;

/**
 * Компонент фильтра-селекта с Ant Design
 */
const FilterSelect = ({ label, name, value, options, onChange }) => (
  <div className="col">
    <label>{label}</label>
    <Select
      value={value}
      onChange={(val) => onChange(name, val)}
      placeholder="Выберите"
      options={options}
      allowClear
      className="filter_select"
      size="large"
    />
  </div>
);

/**
 * Компонент диапазона (мин и макс)
 */
const FilterRange = ({ label, minName, maxName, minValue, maxValue, onChange }) => (
  <div className="col">
    <label>{label}</label>
    <div style={{ display: "flex", gap: "10px" }}>
      <InputNumber
        placeholder="Мин."
        value={minValue !== "" ? Number(minValue) : null}
        onChange={(value) => onChange(minName, value ?? "")}
        style={{ flex: 1 }}
        min={0}
        size="large"
      />
      <InputNumber
        placeholder="Макс."
        value={maxValue !== "" ? Number(maxValue) : null}
        onChange={(value) => onChange(maxName, value ?? "")}
        style={{ flex: 1 }}
        min={0}
        size="large"
      />
    </div>
  </div>
);

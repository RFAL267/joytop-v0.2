import { useState } from "react";
import { Select } from "antd";
import { MapPin, Search } from "lucide-react";

import PageMain_Categories from "./page.main.categories";

import LogoWhite from "../assets/svg/logo.svg";

const locations = [
  { city: "Все", value: 0 },
  { city: "Ташкентская область", value: 1 },
  { city: "Андижанская область", value: 2 },
  { city: "Бухарская область", value: 3 },
  { city: "Джизакская область", value: 4 },
  { city: "Кашкадарьинская область", value: 5 },
  { city: "Навоийская область", value: 6 },
  { city: "Наманганская область", value: 7 },
  { city: "Самаркандская область", value: 8 },
  { city: "Сурхандарьинская область", value: 9 },
  { city: "Сырдарьинская область", value: 10 },
  { city: "Ферганская область", value: 11 },
  { city: "Хорезмская область", value: 12 },
  { city: "Республика Каракалпакстан", value: 13 },
];

// Создаем массив опций с иконкой в label
const locationOptions = locations.map((loc) => ({
  label: (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <MapPin size={16} />
      <span>{loc.city}</span>
    </div>
  ),
  value: loc.value,
}));


const PageMain_Start = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectChange = (value) => {
    const selected = locations.find((loc) => loc.value === value);
    setSelectedLocation(selected);
    console.log("Selected option:", selected);
  };

  return (
    <div className="start_content">
      <div className="overlay" />
      <div className="container">
        <div className="wrap">
          <h1 className="title">
            Найди свой идеальный дом или офис в Узбекистане
          </h1>
          <div className="search_bar">
            <div className="search">
              <input
                type="text"
                className="search_input"
                placeholder="Поиск недвижимости"
              />

              <Select
                className="search_select"
                value={selectedLocation?.value || null}
                onChange={handleSelectChange}
                options={locationOptions}
                placeholder="Вся страна"
                size="large"
                allowClear
                optionLabelProp="label" // Чтобы выбранное значение показывалось с иконкой
                defaultActiveFirstOption={locations[0]}
              />

              <button className="search_btn">Поиск <Search/></button>
            </div>
          </div>
        </div>
      </div>
      <PageMain_Categories/>
    </div>
  );
};

export default PageMain_Start;

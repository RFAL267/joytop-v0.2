// page.main.categories.jsx
// 
import img1 from "../assets/img/city.jpg"
// 

const locations = [
  { city: "Ташкентская область", listings_count: 1423 },
  { city: "Андижанская область", listings_count: 84 },
  { city: "Бухарская область", listings_count: 105 },
  { city: "Джизакская область", listings_count: 53 },
  { city: "Кашкадарьинская область", listings_count: 154 },
  { city: "Навоийская область", listings_count: 32 },
  { city: "Наманганская область", listings_count: 94 },
  { city: "Самаркандская область", listings_count: 508 },
  { city: "Сурхандарьинская область", listings_count: 79 },
  { city: "Сырдарьинская область", listings_count: 47 },
  { city: "Ферганская область", listings_count: 185 },
  { city: "Хорезмская область", listings_count: 76 },
  { city: "Республика Каракалпакстан", listings_count: 113 },
];

// -
const PageMain_Locations = () => {
  return (
    <div className="main_locations">
      <div className="container">
        <h2>Выберите область в котором хотите найти Недвижимость</h2>
        <div className="locations_grid">
          {locations.map((item,i) => (
              <button key={i} className="location_card">
                <p>
                    {item.city}
                </p>
                <span className="listings_count">
                    {item.listings_count}
                </span>
              </button>
            ))}
        </div>
        {/* - */}
      </div>
        
    </div>
  );
};

export default PageMain_Locations;

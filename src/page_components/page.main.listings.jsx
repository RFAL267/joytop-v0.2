// page.main.listings.jsx
// 
import ListingsGrid from "../components/listings.grid"
import Banner_AD3x1 from "../components/banner.ad3x1";
// 
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
// 
import mockImage from "../assets/img/4x3.png";

// Моковые данные
const mockListings = Array.from({ length: 8 }, (_, idx) => ({
  id: idx + 1,
  image: mockImage,
  location: "Tashkent - Uchtepa",
  title: "Сдается Квартира Ташкент Учтепа 51-дом 3-этаж",
  price: "2 000 000",
}));

// -
const PageMain_Listings = () => {
  const navigate = useNavigate();

  const ListingBarTitle = ({ title , nav}) => (
    <div className="listing_bar_title">
      <button onClick={()=>navigate(nav)}>
        <h2>{title}</h2> <ChevronRight/>
      </button>
    </div>

  );
  return (
    <div className="main_listings">
      <div className="container">
        <ListingBarTitle title={"VIP - Обявления на продажу"} nav={"/catalog"}/>
        <ListingsGrid arr={mockListings}/>
        {/* - */}
        <ListingBarTitle title={"VIP - Обявления на аренду"} nav={"/catalog"}/>
        <ListingsGrid arr={mockListings}/>
        {/* - */}
        <Banner_AD3x1/>
      </div>
        
    </div>
  );
};

export default PageMain_Listings;



// 

// page.main.jsx
import "../../css/panel/panel.profile.css";
import PanelLayout from "../../components/panel/panel.layout";
// Components
import ListingsGrid from "../../components/listings.grid"
// 
const mockListings = Array.from({ length: 5 }, (_, idx) => ({
  id: idx + 1,
  image: "/src/assets/img/4x3.png",
  location: "Tashkent - Uchtepa",
  title: "Сдается Квартира Ташкент Учтепа 51-дом 3-этаж",
  price: "2 000 000",
}));
// Page Component
const PanelFavorites = () => {
  return (
    <PanelLayout>
      <section className="panel_page panel_favorites">
        <h1>Мои избранные</h1>
        <div className="cards">
          <ListingsGrid arr={mockListings}/>
        </div>
      </section>
    </PanelLayout>

  );
};

export default PanelFavorites;

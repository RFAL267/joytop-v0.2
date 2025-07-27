// page.user.jsx
import "../css/pages/page.user.css";
import LayoutMain from "../components/layout.main";
// 
import imgProfile from "../assets/img/profile.png"
import IconStarFill from "../components/icons/icon.star.fill";
import ListingsGrid from "../components/listings.grid";
//
const mockListings = Array.from({ length: 7 }, (_, idx) => ({
  id: idx + 1,
  image: "/src/assets/img/4x3.png",
  location: "Tashkent - Uchtepa",
  title: "Сдается Квартира Ташкент Учтепа 51-дом 3-этаж",
  price: "2 000 000 ",
})); 

// Page Component
const PageUser = () => {
  return (
    <LayoutMain>
      <section className="page_user">
            <div className="container">
              <div className="user_card">
                <div className="user_img">
                  <img src={imgProfile} alt={imgProfile}/>
                </div>
                <div className="user_content">
                <p className="user_name">Компания Clear Marketing Business</p>
                  <div className="user_rating">
                    Рейтинг (27 отзывов) 5 <IconStarFill/>
                  </div>
                  <span className="join_date">
                    Присоединение: 25 июня 2024 г.
                  </span>
                  <article className="user_bio">
                    Специализация на маркетинге в сфере недвижимости. • Помощь клиенту в поиске подходящей недвижимости. • Подача и сопровождение сделки клиента в финансовых органах до тех пор, пока недвижимость не будет освобождена без уплаты сборов.
                    Специализация на маркетинге в сфере недвижимости. • Помощь клиенту в поиске подходящей недвижимости. • Подача и сопровождение сделки клиента в финансовых органах до тех пор, пока недвижимость не будет освобождена без уплаты сборов.
                  </article>
                </div>
                
              </div>
              {/* - */}
              <div className="user_listings">
                <h3>Объявления пользователя</h3>
                <ListingsGrid arr={mockListings}/>
              </div>
            </div>
      </section>
    </LayoutMain>
  );
};

export default PageUser;

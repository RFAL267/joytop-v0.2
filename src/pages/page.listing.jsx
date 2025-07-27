// page.main.jsx
import "../css/pages/page.listing.css";
import LayoutMain from "../components/layout.main";
import img1 from "../assets/img/city.jpg";
import img2 from "../assets/img/t1.webp";
import imgProfile from "../assets/img/profile.png";
import video from "../assets/video/video.webm";
import videoThumbnail from "../assets/img/16x9.png"
// 
import { CircleCheck, ChevronRight, Bookmark, Heart } from "lucide-react";
import IconStarFill from "../components/icons/icon.star.fill";
import IconShieldCheckFill from "../components/icons/icon.shieldCheck.fill";
// 
import Banner_AD3x1 from "../components/banner.ad3x1";
import ListingsGrid from "../components/listings.grid"
import ListingSlider from "../components/listing.slider";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
//
import mockImage from "../assets/img/4x3.png";

// Моковые данные
const mockListings = Array.from({ length: 4 }, (_, idx) => ({
  id: idx + 1,
  image: mockImage,
  location: "Tashkent - Uchtepa",
  title: "Сдается Квартира Ташкент Учтепа 51-дом 3-этаж",
  price: "2 000 000",
}));
const slider_images = Array(10).fill(img2);

// Page Component
const PageListing = () => {
  const navigate = useNavigate();
  return (
    <LayoutMain>
      <section className="page_listing">
        <div className="container">
          <div className="listing_body">
            <div className="slider_wrap">
              <ListingSlider images={slider_images}/>
              <button className="btn_favorite">
                <Heart/>
              </button>
            </div>
            {/* Галерея изображений */}
            {/* - */}
            <h2 className="listing_title">Сдается Квартира Ташкент Учтепа 51-дом 3-этаж</h2>
            <div className="listing_content">
                <div className="listing_owner">
                  <div className="owner_content">
                    <p>Информация рекламодателя</p>
                    <div className="owner_card">
                        <button className="row owner_profile" onClick={()=> navigate("/user")}>
                            <img className="owner_img" src={imgProfile} alt={imgProfile} />
                            <div className="col">
                              <span className="owner_name">
                                Компания Clear Marketing Business
                              </span>
                              <span className="rating">
                                Рейтинг(27) 5 <IconStarFill/>
                              </span>
                            </div>
                        </button>
                        <div className="row owner_contact">
                            <button className="btn_whatsapp">
                                WhatsApp
                            </button>
                            <button className="btn_comm">
                                Коммуникация
                            </button>
                        </div>
                    </div>

                    <Alert
                      message="Ваши отношения должны быть только с рекламодателем, присутствие третьей стороны может означать мошенничество."
                      type="success"
                      showIcon
                      icon={<IconShieldCheckFill/>}
                    />
                  </div>
                    
                </div>
                {/* - */}
                <div className="listing_details">
                    <p className="listing_category">Квартира на аренду</p>
                    <p className="listing_price">2 000 000 UZS /ежемесячно</p>
                    <article className="detail_text">
                      Предлагает жилые помещения для годовой аренды с уникальными услугами, в том числе: 1- Особое расположение в центре Эр-Рияда, рядом с самыми важными дорогами. 2- Меблировано роскошной и очень элегантной мебелью. 3- Эксклюзивные услуги и удобства включают тренажерный зал, умный вход, высокий уровень безопасности и другие. Для получения более подробной информации свяжитесь с нами через Luxury Suites в районе Олая. В проекте «Роскошная резиденция» мы предлагаем вам жилые помещения для годовой аренды со многими выдающимися услугами, в том числе: 1- Выдающееся расположение в самом сердце Эр-Рияда в районе Олая, рядом со всеми дорогами и важными достопримечательностями. 2- Квартиры обставлены роскошной и элегантной мебелью. 3- Множество эксклюзивных услуг и общественных удобств: техническое обслуживание, умный вход, тренажерный зал, внешние камеры наблюдения, высокоскоростной интернет и многое другое.
                    </article>

                    <div className="detail_row listing_specs">
                      <h3>Детали</h3>
                      <div className="grid">
                      <div className="spec">
                        <span className="spec_title">Область</span>
                        <span className="spec_value">500 м²</span>
                      </div>

                      <div className="spec">
                        <span className="spec_title">Комнат</span>
                        <span className="spec_value">4</span>
                      </div>
                      <div className="spec">
                        <span className="spec_title">Ванные</span>
                        <span className="spec_value">1</span>
                      </div>
                      <div className="spec">
                        <span className="spec_title">Туалеты</span>
                        <span className="spec_value">1</span>
                      </div>

                      <div className="spec">
                        <span className="spec_title">Спальни</span>
                        <span className="spec_value">1</span>
                      </div>
                      <div className="spec">
                        <span className="spec_title">Возраст недвижимости</span>
                        <span className="spec_value">Новый</span>
                      </div>
                      <div className="spec">
                        <span className="spec_title">Цель</span>
                        <span className="spec_value">Жилой</span>
                      </div>
                      <div className="spec">
                        <span className="spec_title">Залы</span>
                        <span className="spec_value">1</span>
                      </div>
                      </div>
                    </div>

                    {/* - */}
                    <div className="detail_row listing_features">
                      <h3>Функции</h3>
                      <div className="grid">
                        <div className="feature">
                          <CircleCheck/> <span>Меблированный</span> 
                        </div>

                        <div className="feature">
                          <CircleCheck/> <span>Лифт</span>
                        </div>
                        <div className="feature">
                          <CircleCheck/> <span>Наличие воды</span>
                        </div>
                        <div className="feature">
                          <CircleCheck/> <span>Санитария доступна</span>
                        </div>
                        <div className="feature">
                          <CircleCheck/> <span>Отдельный счетчик электроэнергии</span>
                        </div>
                        <div className="feature">
                          <CircleCheck/> <span>Кухня</span>
                        </div>
                        <div className="feature">
                          <CircleCheck/> <span>Кондиционер</span>
                        </div>
                        <div className="feature">
                          <CircleCheck/> <span>Наличие электроэнергии</span>
                        </div>
                        
                      </div>
                    </div>
                    {/* - */}
                    <div className="detail_row listing_video">
                      <h3>Видео</h3>
                      <video 
                        src={video} 
                        controls 
                        poster={videoThumbnail}
                        preload="metadata"
                      >
                        Ваш браузер не поддерживает видео.
                      </video>
                    </div>
                    {/* - */}
                    <div className="detail_row listing_map">
                      <h3>Карта</h3>
                      <div className="map_body">
                      </div>
                    </div>
                </div>
            </div>
          </div>

          {/* - */}
          <div className="like_listings">
            <div className="header">
              <h3>Похожие объявления</h3>
              <button className="btn_all">Показать все <ChevronRight/></button>
            </div>
            <ListingsGrid arr={mockListings}/>
          </div>
          {/* - */}
          <Banner_AD3x1/>
        </div>
      </section>
    </LayoutMain>
  );
};

export default PageListing;
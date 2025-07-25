// listing.card.jsx
import PropTypes from "prop-types"; // для типизации пропсов
import "../css/components/listing.card.css"; // создаем отдельный CSS под карточку
import { useNavigate } from "react-router-dom";
const ListingCard = ({ image, location, title, price }) => {
  const navigate = useNavigate();
  return (
    <button 
    className="listing_card" 
    onClick={()=>{navigate("/listing")}}
    >
      <img className="poster" src={image} alt={`Изображение недвижимости: ${title}`} />
      <div className="listing_content">
          <span className="location">{location}</span>
          <span className="title">{title}</span>
          <span className="price">{price} UZS</span>

      </div>
    </button>
  );
};

ListingCard.propTypes = {
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ListingCard;

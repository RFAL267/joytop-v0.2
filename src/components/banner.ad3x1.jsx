// page.main.jsx
import "../css/components/banner.advertisement.css";
// img
import adImg from "../assets/img/ad1.jpg"
// Components

// Constants


// Page Component
const Banner_AD3x1 = () => {
  return (
    <div className="banner_ad3x1">
        <div className="container">
            <button className="banner">
                <img src={adImg} alt={adImg} />
            </button>
        </div>
    </div>
  );
};

export default Banner_AD3x1;

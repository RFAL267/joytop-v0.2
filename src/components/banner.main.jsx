// banner.main.jsx
import "../css/components/banner.advertisement.css";
// img
import adImg from "../assets/img/banner.main.png"
// Components

// Constants


// Page Component
const Banner_AD_Main = () => {
  return (
    <div className="banner_main">
        <button className="banner">
            <img src={adImg} alt={adImg} />
        </button>
    </div>
  );
};

export default Banner_AD_Main;

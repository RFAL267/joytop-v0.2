// page.main.jsx
import "../css/pages/page.partners.css";
import LayoutMain from "../components/layout.main";

// 
import Banner_AD3x1 from "../components/banner.ad3x1";


// Page Component
const PageMap = () => {
  return (
    <LayoutMain>
      <section className="page_partners">
            <div className="container">
              <div className="partners_grid">
                <button></button>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
              </div>
                <Banner_AD3x1/>
            </div>
      </section>
    </LayoutMain>
  );
};

export default PageMap;

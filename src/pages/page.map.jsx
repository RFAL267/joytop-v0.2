// page.main.jsx
import "../css/pages/page.map.css";
import LayoutMain from "../components/layout.main";

// 
import Banner_AD3x1 from "../components/banner.ad3x1";


// Page Component
const PageMap = () => {
  return (
    <LayoutMain>
      <section className="page_map">
            <div className="container">
                <Banner_AD3x1/>
            </div>
      </section>
    </LayoutMain>
  );
};

export default PageMap;

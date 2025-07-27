// page.main.jsx
import "../css/pages/page.main.css";
import LayoutMain from "../components/layout.main";


// Components
import PageMain_Start from "../page_components/page.main.start"
import PageMain_Categories from "../page_components/page.main.categories"
import PageMain_Listings from "../page_components/page.main.listings";
import PageMain_Locations from "../page_components/page.main.locations";
import Banner_AD_Main from "../components/banner.main";
// 

// Page Component
const PageMain = () => {
  return (
    <LayoutMain>
      <section className="page_main">
        {/* 1 */}
        <PageMain_Start/>
        {/* 2 */}
        {/* <PageMain_Categories/> */}
        {/* 4 */}
        <PageMain_Listings/>
        {/* 5 */}
        <PageMain_Locations/>
      </section>
    </LayoutMain>
  );
};

export default PageMain;

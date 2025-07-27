// page.main.jsx
import "../css/pages/page.support.css";
import LayoutMain from "../components/layout.main";
import PC_Questions from "../page_components/pc.questions";
// 

// Page Component
const PageMap = () => {
  return (
    <LayoutMain>
      <section className="page_support">
            <div className="container">
                <PC_Questions/>
            </div>
      </section>
    </LayoutMain>
  );
};

export default PageMap;

// page.main.jsx
import "../../css/panel/panel.services.css";
import PanelLayout from "../../components/panel/panel.layout";
// Components
// 
// Page Component
const PanelServices = () => {
  return (
    <PanelLayout>
      <section className="panel_page panel_services">
        <h1>Услуги и тарифы</h1>

        <h2>Мои услуги</h2>
        <div className="wrap">
          <div className="table">
            <h3>У вас нет активных услуг</h3>
          </div>
        </div>
      </section>
    </PanelLayout>

  );
};

export default PanelServices;

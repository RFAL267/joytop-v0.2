// page.404.jsx
import "../css/pages/page.404.css";
import LayoutMain from "../components/layout.main";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 

// Page Component
const Page404 = () => {
  const nav = useNavigate();
  return (
    <LayoutMain>
      <section className="page_404">
            <div className="container">
              <div className="content">
                <h1>404</h1>
                <p>Страница не найдена</p>
                <button className="main_btn" onClick={()=>nav("/")}>
                  <ChevronLeft/>
                  <span>
                    Вернутся на главную 
                  </span>
                </button>
              </div>
            </div>
      </section>
    </LayoutMain>
  );
};

export default Page404;

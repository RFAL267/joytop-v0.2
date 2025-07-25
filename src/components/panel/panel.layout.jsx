// pane.layout.jsx
import "../../css/panel/panel.layout.css"
import Footer from "../footer";
import PanelSidebar from "./panel.sidebar";
import HeaderTop from "../header.top";
import { Check_hasUser } from "../../security/security";

const PanelLayout = ({ children }) => {
    Check_hasUser();
    return (
        <>
            <div className="panel_layout">
            <PanelSidebar/>
            <div className="panel_body">
                <HeaderTop/>
                {children}
            </div>
            </div>
        </>
    );
};

export default PanelLayout;
// components/Layout.js
import Header from "./header";
import Footer from "./footer";
import PC_SupportReq from "../page_components/pc.support.req"

const LayoutMain = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <PC_SupportReq/>
            <Footer />
        </>
    );
};

export default LayoutMain;

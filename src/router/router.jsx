import { Routes, Route } from 'react-router-dom';
// 
import Page404 from '../pages/404';
// 
import PageMain from '../pages/page.main';
import PageCatalog from '../pages/page.catalog';
// RL
import PageRegister from '../pages/page.register';
import PageLogin from '../pages/page.login';
import PageMap from '../pages/page.map';
import PagePartners from '../pages/page.partners';
import PageServices from '../pages/page.services';
import PageSupport from '../pages/page.support';
import PageListing from '../pages/page.listing';
import PageUser from '../pages/page.user';
// User Panel
import PanelProfile from "../pages/panel/profile"
import PanelListings from '../pages/panel/listings';
import PanelWallet from '../pages/panel/wallet';
import PanelServices from '../pages/panel/services';
import PanelChat from '../pages/panel/chat';
import PanelFavorites from '../pages/panel/favorites';
// 
import PanelNewListing from '../pages/panel/new.lisiting';

// 
export default function Router() {
  return (
    <Routes>
      {/* 404 */}
      <Route path="*" element={<Page404 />} />
      {/* PAGES */}
      <Route path="/" element={<PageMain />} />
      <Route path="/catalog" element={<PageCatalog />} />
      <Route path="/register" element={<PageRegister />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/map" element={<PageMap />} />
      <Route path="/services" element={<PageServices/>} />
      <Route path="/partners" element={<PagePartners />} />
      <Route path="/support" element={<PageSupport />} />
      <Route path="/listing" element={<PageListing />} />
      <Route path="/user" element={<PageUser />} />
      {/* PANEL */}
      <Route path="/panel" element={<PanelProfile />} />
      <Route path="/panel/listings" element={<PanelListings />} />
      <Route path="/panel/wallet" element={<PanelWallet />} />
      <Route path="/panel/services" element={<PanelServices />} />
      <Route path="/panel/chat" element={<PanelChat />} />
      <Route path="/panel/favorites" element={<PanelFavorites />} />
      <Route path="/panel/new/listing" element={<PanelNewListing />} />
    </Routes>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './css/fonts.css'
import 'antd/dist/reset.css'; // Современная версия (сброс стилей)
import './root.css';
import "./css/ant.custom.css";
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
        <App />
  </React.StrictMode>
  </BrowserRouter>
);

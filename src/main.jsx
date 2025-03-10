import React from 'react';
import ReactDOM from 'react-dom/client';
import '../main'; // 導入 main.js 文件
import App from './App';


// 導入 AOS 和 Swiper
import AOS from 'aos';
import 'aos/dist/aos.css';
// 初始化 AOS
AOS.init();

// 動態加載 Google Fonts
const loadGoogleFonts = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };
  
  const loadGoogleFonts2 = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };
  
  loadGoogleFonts();
  loadGoogleFonts2();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 환경 변수를 사용해 네이버 지도 API 스크립트를 추가
// const naverMapScript = document.createElement('script');
// naverMapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_CLIENT_ID}&submodules=geocoder,drawing`;
// naverMapScript.defer = true;
// document.head.appendChild(naverMapScript);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

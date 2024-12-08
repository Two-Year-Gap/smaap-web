import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AnalysisProvider } from './contexts/AnalysisContext';
import { BusinessProvider } from './contexts/BusinessContext';
import { MapProvider } from './contexts/MapContext';
import { MenuOptionProvider } from './contexts/MenuOptionContext';
import { NeighborhoodProvider } from './contexts/NeighborhoodContext';
import { SchoolProvider } from './contexts/SchoolContext';
import './index.css';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  ArcElement, // Pie/Donut 차트에서 사용
  LineElement, // Line 차트에서 사용
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

// 네이버 지도 스크립트 동적 추가
const loadNaverMapScript = async () => {
  return new Promise<void>((resolve, reject) => {
    const naverMapScript = document.createElement('script');
    naverMapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_CLIENT_ID}&submodules=geocoder,drawing`;
    naverMapScript.defer = true;
    naverMapScript.onload = () => resolve(); // 스크립트 로드 완료 시 resolve 호출
    naverMapScript.onerror = () => {
      console.error('네이버 지도 API가 로드되지 않았습니다.');
      reject(new Error('네이버 지도 API가 로드되지 않았습니다.'));
    };
    document.head.appendChild(naverMapScript); // 스크립트를 헤드에 추가
  });
};

(async () => {
  await loadNaverMapScript(); // 스크립트 로드 대기 후 App 렌더링

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );
  root.render(
    <React.StrictMode>
      <NeighborhoodProvider>
        <MenuOptionProvider>
          <MapProvider>
            <SchoolProvider>
              <BusinessProvider>
                <AnalysisProvider>
                  <App />
                </AnalysisProvider>
              </BusinessProvider>
            </SchoolProvider>
          </MapProvider>
        </MenuOptionProvider>
      </NeighborhoodProvider>
    </React.StrictMode>,
  );
})();

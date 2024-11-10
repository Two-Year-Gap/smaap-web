import { useState } from 'react';
import './App.css';
import temp from './assets/temp.png';
import DropdownBar from './components/Dropdown/DropdownBar';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import NaverMap from './components/NaverMap/NaverMap';

type MapData = {
  type: '학교 검색' | '업종 선택' | '분석 개요';
  coordinates?: { latitude: number; longitude: number };
  radius?: number;
  name?: string;
} | null;

const App = () => {
  const [mapData, setMapData] = useState<MapData>(null);

  const handleSchoolSearch = (
    latitude: number,
    longitude: number,
    name: string,
  ) => {
    setMapData({
      type: '학교 검색',
      coordinates: { latitude, longitude },
      radius: 500,
      name,
    });
  };

  const handleBusinessSelect = (latitude: number, longitude: number) => {
    setMapData({
      type: '업종 선택',
      coordinates: { latitude, longitude },
    });
  };

  const handleAnalysisOverview = () => {
    setMapData({
      type: '분석 개요',
    });
  };

  return (
    <div className="layout">
      <Header />
      <div className="map-container">
        <div className="dropdown-container">
          <DropdownBar />
        </div>
        <NaverMap mapData={mapData} />
        <Menu
          onSchoolSearch={handleSchoolSearch}
          onBusinessSelect={handleBusinessSelect}
          onAnalysisOverview={handleAnalysisOverview}
        />
        <img alt="school-info" src={temp} />
      </div>
    </div>
  );
};

export default App;

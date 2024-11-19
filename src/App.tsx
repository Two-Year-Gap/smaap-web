import { useState } from 'react';
import './App.css';
import temp from './assets/temp.png';
import temp2 from './assets/temp2.png';
import DropdownBar from './components/Dropdown/DropdownBar';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import NaverMap from './components/NaverMap/NaverMap';

type MenuOption = '학교 선택' | '업종 선택' | '분석 개요';

const App = () => {
  const [selected, setSelected] = useState<MenuOption>('학교 선택');

  /*
  선택한 학교셋 데이터 MapData로 포맷해서 전달.?
  const handleSchoolSearch = (
    latitude: number,
    longitude: number,
    name: string,
  ) => {
    setMapData({
      type: '학교 검색',
      coordinates: { latitude, longitude },
      radius: 500,
      school_name: name,
    });
  };
  */

  return (
    <div className="layout">
      <Header />
      <div className="map-container">
        <div className="dropdown-container">
          <DropdownBar />
        </div>
        <NaverMap selected={selected} />
        <Menu selected={selected} setSelected={setSelected} />
        <img src={temp} alt="school-info" />
        <img src={temp2} alt="range-modal" />
      </div>
    </div>
  );
};

export default App;

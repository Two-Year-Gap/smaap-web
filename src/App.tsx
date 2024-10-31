import './App.css';
import Dropdown from './components/Dropdown/Dropdown';
import RootDropdown from './components/Dropdown/RootDropdown';
import Header from './components/Header/Header';
import NaverMap from './components/NaverMap/NaverMap';

const App = () => {
  return (
    <div className="layout">
      <Header />
      <div className="map-container">
        <div className="dropdown-container">
          {/* 47%, 722px */}
          <RootDropdown />
          <Dropdown
            label="학교 구분"
            items={['전체', '초등학교', '중학교', '고등학교']}
          />
          <Dropdown
            label="공학 구분"
            items={['전체', '남녀공학', '남', '여']}
          />
          <Dropdown label="구 구분" items={['전체', '중구', '동구', '서구']} />
          <Dropdown
            label="동 구분"
            items={['전체', '남산동', '대봉동', '대신동']}
          />
        </div>
        <NaverMap />
      </div>
    </div>
  );
};

export default App;

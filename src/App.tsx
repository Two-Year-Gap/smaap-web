import './App.css';
import DropdownBar from './components/Dropdown/DropdownBar';
import Header from './components/Header/Header';
import AnalysisInfo from './components/InfoLabel/AnalysisInfo';
import BusinessInfo from './components/InfoLabel/BusinessInfo';
import SchoolInfo from './components/InfoLabel/SchoolInfo';
import Menu from './components/Menu/Menu';
import NaverMap from './components/NaverMap/NaverMap';

const App = () => {
  return (
    <div className="layout">
      <Header />
      <div className="map-container">
        <div className="dropdown-container">
          <DropdownBar />
        </div>
        <NaverMap />
        <Menu />
        <SchoolInfo />
        <BusinessInfo />
        <AnalysisInfo />
        {/* <img src={temp} alt="school-info" /> */}
        {/* <img src={temp2} alt="range-modal" /> */}
      </div>
    </div>
  );
};

export default App;

import './App.css';
import DropdownBar from './components/Dropdown/DropdownBar';
import Header from './components/Header/Header';
import HotCommercial from './components/HotCommercial/HotCommercial';
import AnalysisInfo from './components/InfoLabel/AnalysisInfo';
import BusinessInfo from './components/InfoLabel/BusinessInfo';
import SchoolInfo from './components/InfoLabel/SchoolInfo';
import Menu from './components/Menu/Menu';
import NaverMap from './components/NaverMap/NaverMap';
import AnalysisReportModal from './features/AnalysisReport/AnalysisReportModal';
import useModal from './hooks/useModal';

const App = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="layout">
      <Header />
      <div className="map-container">
        <div className="dropdown-container">
          <DropdownBar />
        </div>
        <NaverMap />
        <Menu openModal={openModal} />
        <HotCommercial />
        <SchoolInfo />
        <BusinessInfo />
        <AnalysisInfo />
      </div>

      {isOpen && <AnalysisReportModal onClose={closeModal} />}
    </div>
  );
};

export default App;

import './App.css';
import Header from './components/Header/Header';
import NaverMap from './components/NaverMap/NaverMap';

function App() {
  return (
    <div className="layout">
      <Header />
      <div className="map-container">
        <NaverMap />
      </div>
    </div>
  );
}

export default App;

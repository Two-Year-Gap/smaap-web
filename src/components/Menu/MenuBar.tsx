import { useMenuOptionContext } from 'src/contexts/MenuOptionContext';
import './Menu.css';

const MenuBar = () => {
  const { selectedOption, setSelectedOption } = useMenuOptionContext();

  return (
    <div className="menu-bar">
      <button
        className={`menu-btn ${selectedOption === '학교 선택' ? 'selected' : ''}`}
        onClick={() => setSelectedOption('학교 선택')}
      >
        학교 선택
      </button>
      <button
        className={`menu-btn ${selectedOption === '업종 선택' ? 'selected' : ''}`}
        onClick={() => setSelectedOption('업종 선택')}
      >
        업종 선택
      </button>
      <button
        className={`menu-btn ${selectedOption === '분석 개요' ? 'selected' : ''}`}
        onClick={() => setSelectedOption('분석 개요')}
      >
        분석 개요
      </button>
    </div>
  );
};

export default MenuBar;

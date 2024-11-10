import './Menu.css';

type MenuOption = '학교 선택' | '업종 선택' | '분석 개요';

interface MenuBarProps {
  selected: MenuOption;
  setSelected: (option: MenuOption) => void;
}

const MenuBar = ({ selected, setSelected }: MenuBarProps) => {
  return (
    <div className="menu-bar">
      <button
        className={`menu-btn ${selected === '학교 선택' ? 'selected' : ''}`}
        onClick={() => setSelected('학교 선택')}
      >
        학교 선택
      </button>
      <button
        className={`menu-btn ${selected === '업종 선택' ? 'selected' : ''}`}
        onClick={() => setSelected('업종 선택')}
      >
        업종 선택
      </button>
      <button
        className={`menu-btn ${selected === '분석 개요' ? 'selected' : ''}`}
        onClick={() => setSelected('분석 개요')}
      >
        분석 개요
      </button>
    </div>
  );
};

export default MenuBar;

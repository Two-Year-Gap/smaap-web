import AnalysisOverview from 'src/features/AnalysisOverview/AnalysisOverview';
import BusinessSelect from 'src/features/BusinessSelect/BusinessSelect';
import SchoolSearch from 'src/features/SchoolSearch/SchoolSearch';
import './Menu.css';
import MenuBar from './MenuBar';

type MenuOption = '학교 선택' | '업종 선택' | '분석 개요';

interface MenuProps {
  selected: MenuOption;
  setSelected: (option: MenuOption) => void;
}

const Menu = ({ selected, setSelected }: MenuProps) => {
  // 선택된 메뉴에 따라 렌더링할 컴포넌트 결정
  let content;
  if (selected === '학교 선택') {
    content = <SchoolSearch />;
  } else if (selected === '업종 선택') {
    content = <BusinessSelect />;
  } else if (selected === '분석 개요') {
    content = <AnalysisOverview />;
  }

  return (
    <div className="menu">
      <MenuBar selected={selected} setSelected={setSelected} />
      {content}
    </div>
  );
};

export default Menu;

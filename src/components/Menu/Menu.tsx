import { useState } from 'react';
import AnalysisOverview from 'src/features/AnalysisOverview/AnalysisOverview';
import BusinessSelect from 'src/features/BusinessSelect/BusinessSelect';
import SchoolSearch from 'src/features/SchoolSearch/SchoolSearch';
import './Menu.css';
import MenuBar from './MenuBar';

type MenuOption = '학교 선택' | '업종 선택' | '분석 개요';

interface MenuProps {
  onSchoolSearch: (latitude: number, longitude: number, name: string) => void;
  onBusinessSelect: (latitude: number, longitude: number) => void;
  onAnalysisOverview: (latitude: number, longitude: number) => void;
}

const Menu = ({
  onSchoolSearch,
  onBusinessSelect,
  onAnalysisOverview,
}: MenuProps) => {
  const [selected, setSelected] = useState<MenuOption>('학교 선택');

  // 선택된 메뉴에 따라 렌더링할 컴포넌트 결정
  let content;
  if (selected === '학교 선택') {
    content = <SchoolSearch onSchoolSearch={onSchoolSearch} />;
  } else if (selected === '업종 선택') {
    content = <BusinessSelect onBusinessSelect={onBusinessSelect} />;
  } else if (selected === '분석 개요') {
    content = <AnalysisOverview onAnalysisOverview={onAnalysisOverview} />;
  }

  return (
    <div className="menu">
      <MenuBar selected={selected} setSelected={setSelected} />
      {content}
    </div>
  );
};

export default Menu;

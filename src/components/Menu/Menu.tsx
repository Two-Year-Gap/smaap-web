import { useMenuOptionContext } from 'src/contexts/MenuOptionContext';
import AnalysisOverview from 'src/features/AnalysisOverview/AnalysisOverview';
import BusinessSelect from 'src/features/BusinessSelect/BusinessSelect';
import SchoolSearch from 'src/features/SchoolSearch/SchoolSearch';
import './Menu.css';
import MenuBar from './MenuBar';

const Menu = () => {
  const { selectedOption } = useMenuOptionContext();

  let content;
  if (selectedOption === '학교 선택') {
    content = <SchoolSearch />;
  } else if (selectedOption === '업종 선택') {
    content = <BusinessSelect />;
  } else if (selectedOption === '분석 개요') {
    content = <AnalysisOverview />;
  }

  return (
    <div className="menu">
      <MenuBar />
      {content}
    </div>
  );
};

export default Menu;

import { useState } from 'react';
import Btn from 'src/components/Button/Button';
import { AnalysisItem, useAnalysisContext } from 'src/contexts/AnalysisContext';
import { ReactComponent as BellIcon } from '../../assets/analysis/bell.svg';
import { ReactComponent as CctvIcon } from '../../assets/analysis/cctv.svg';
import { ReactComponent as FloatingIcon } from '../../assets/analysis/floating_population.svg';
import { ReactComponent as HouseIcon } from '../../assets/analysis/house.svg';
import { ReactComponent as ResidentIcon } from '../../assets/analysis/resident_population.svg';
import { ReactComponent as SalesIcon } from '../../assets/analysis/sales.svg';
import { ReactComponent as StoreIcon } from '../../assets/analysis/store.svg';
import './AnalysisOverview.css';

interface AnalysisOverviewProps {
  openModal: () => void;
}

const AnalysisOverview = ({ openModal }: AnalysisOverviewProps) => {
  const [selectedTab, setSelectedTab] = useState<'상권' | '인프라'>('상권');
  const { selectedAnalysisItem, setSelectedAnalysisItem } =
    useAnalysisContext();

  const tabContent: Record<
    '상권' | '인프라',
    { icon: JSX.Element; label: AnalysisItem }[]
  > = {
    상권: [
      { icon: <StoreIcon />, label: '점포수' },
      { icon: <SalesIcon />, label: '매출액' },
      { icon: <FloatingIcon />, label: '유동인구' },
      { icon: <ResidentIcon />, label: '거주인구' },
    ],
    인프라: [
      { icon: <BellIcon />, label: '안전비상벨' },
      { icon: <HouseIcon />, label: '안전지킴이집' },
      { icon: <CctvIcon />, label: 'CCTV' },
    ],
  };

  const handleItemClick = (label: AnalysisItem) => {
    setSelectedAnalysisItem(label); // 선택된 아이템 저장
  };

  return (
    <div className="analysis-overview">
      {/* 탭 영역 */}
      <div className="tabs">
        <button
          className={selectedTab === '상권' ? 'tab active' : 'tab'}
          onClick={() => {
            setSelectedTab('상권');
          }}
        >
          상권
        </button>
        <button
          className={selectedTab === '인프라' ? 'tab active' : 'tab'}
          onClick={() => {
            setSelectedTab('인프라');
          }}
        >
          인프라
        </button>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="overview-content">
        <div className="icon-container">
          {tabContent[selectedTab].map((item, index) => (
            <div
              key={index}
              className={`icon-item ${
                selectedAnalysisItem === item.label ? 'selected' : ''
              }`}
              onClick={() => handleItemClick(item.label)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <Btn text="상세 분석" onClick={openModal} />
    </div>
  );
};

export default AnalysisOverview;

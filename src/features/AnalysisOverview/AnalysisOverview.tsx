import Btn from 'src/components/Button/Button';
import './AnalysisOverview.css';

interface AnalysisOverviewProps {
  onAnalysisOverview: (latitude: number, longitude: number) => void;
}
const AnalysisOverview = ({ onAnalysisOverview }: AnalysisOverviewProps) => {
  return (
    <div>
      <Btn text="상세 분석" />
    </div>
  );
};

export default AnalysisOverview;

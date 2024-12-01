import { useSchoolContext } from 'src/contexts/SchoolContext';
import { ReactComponent as AnalysisIcon } from '../../assets/label/analysis.svg';
import './InfoLabel.css';

const AnalysisInfo = () => {
  const { selectedSchool } = useSchoolContext();
  return (
    <div className="info-label analysis">
      <AnalysisIcon />
      <div className="label-container analysis">
        <span>{selectedSchool?.name || '대구초등학교'}</span>
      </div>
    </div>
  );
};

export default AnalysisInfo;

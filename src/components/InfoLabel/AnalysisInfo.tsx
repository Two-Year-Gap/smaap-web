import { useAnalysisContext } from 'src/contexts/AnalysisContext';
import { useSchoolContext } from 'src/contexts/SchoolContext';
import { ReactComponent as AnalysisIcon } from '../../assets/label/analysis.svg';
import './InfoLabel.css';

const AnalysisInfo = () => {
  const { selectedSchool } = useSchoolContext();
  const { selectedAnalysisItem } = useAnalysisContext();
  return (
    <div
      className={`info-label analysis ${!selectedAnalysisItem ? 'hidden' : ''}`}
    >
      <AnalysisIcon />
      {selectedAnalysisItem && (
        <div className="label-container analysis">
          <span>{selectedSchool?.name}</span>
        </div>
      )}
    </div>
  );
};

export default AnalysisInfo;

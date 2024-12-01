import { useSchoolContext } from 'src/contexts/SchoolContext';
import { ReactComponent as SchoolIcon } from '../../assets/label/school.svg';
import './InfoLabel.css';

const SchoolInfo = () => {
  const { selectedSchool } = useSchoolContext();
  return (
    <div className="info-label school">
      <SchoolIcon />
      <div className="label-container school">
        <div>
          <h3>학생 수</h3>
          <span>{selectedSchool?.studentCount}</span>
        </div>
        <div>
          <h3>교원 수</h3>
          <span>{selectedSchool?.employeeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default SchoolInfo;

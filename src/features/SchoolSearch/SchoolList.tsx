import { schools } from '../../data/schools';
import './SchoolSearch.css';

interface SchoolListProps {
  onSchoolSearch: (latitude: number, longitude: number, name: string) => void;
  selectedSchoolName: string | null;
}

const SchoolList = ({
  onSchoolSearch,
  selectedSchoolName,
}: SchoolListProps) => {
  return (
    <ul className="school-list">
      {schools.map((school, index) => (
        <li
          key={index}
          className={`school-item ${selectedSchoolName === school.name ? 'selected' : ''}`}
          onClick={() =>
            onSchoolSearch(school.latitude, school.longitude, school.name)
          }
        >
          {school.name}
        </li>
      ))}
    </ul>
  );
};

export default SchoolList;

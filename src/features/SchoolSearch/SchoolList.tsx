import { schools } from '../../data/schools';
import './SchoolSearch.css';

interface SchoolListProps {
  selectedSchool: {
    name: string | null;
    latitude: number | null;
    longitude: number | null;
  };
  setSelectedSchool: (school: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
}

const SchoolList = ({ selectedSchool, setSelectedSchool }: SchoolListProps) => {
  return (
    <ul className="school-list">
      {schools.map((school, index) => (
        <li
          key={index}
          className={`school-item ${selectedSchool.name === school.name ? 'selected' : ''}`}
          onClick={() => setSelectedSchool(school)}
        >
          {school.name}
        </li>
      ))}
    </ul>
  );
};

export default SchoolList;

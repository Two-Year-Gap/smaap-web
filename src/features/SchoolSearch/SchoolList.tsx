import { useEffect, useState } from 'react';
import { useSchoolContext } from 'src/contexts/SchoolContext';
import useDebounce from 'src/hooks/useDebounce';
import { fetchSchools } from 'src/services/schoolService';
import { School } from 'src/types/schools';
import './SchoolSearch.css';

interface SchoolListProps {
  name: string; // 검색어
}

const SchoolList = ({ name }: SchoolListProps) => {
  const { selectedSchool, setSelectedSchool } = useSchoolContext();
  const [schools, setSchools] = useState<School[]>([]);
  const debouncedName = useDebounce(name, 500); // 500ms 디바운스 적용

  useEffect(() => {
    const loadSchools = async () => {
      if (!debouncedName && debouncedName !== '') return; // 디바운스된 값이 비어있으면 fetch하지 않음
      try {
        const schoolData = await fetchSchools({ name: debouncedName || '' });
        setSchools(schoolData);
      } catch (error) {
        console.error('Load schools error:', error);
      }
    };

    loadSchools();
  }, [debouncedName]); // 디바운스된 값이 변경될 때 fetch

  return (
    <ul className="school-list">
      {schools.map((school, index) => (
        <li
          key={index}
          className={`school-item ${selectedSchool?.name === school.name ? 'selected' : ''}`}
          onClick={() => setSelectedSchool(school)}
        >
          {school.name}
        </li>
      ))}
    </ul>
  );
};

export default SchoolList;

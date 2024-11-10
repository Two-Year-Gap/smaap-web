import { useState } from 'react';
import Btn from 'src/components/Button/Button';
import SearchBar from '../SearchBar/SearchBar';
import SchoolList from './SchoolList';
import './SchoolSearch.css';

interface SchoolSearchProps {
  onSchoolSearch: (latitude: number, longitude: number, name: string) => void;
}

const SchoolSearch = ({ onSchoolSearch }: SchoolSearchProps) => {
  const [isSearched, setIsSearched] = useState(false);
  const [selectedSchoolName, setSelectedSchoolName] = useState<string | null>(
    null,
  );

  const handleSearch = () => {
    setIsSearched(true);
  };

  const handleSchoolSearch = (
    latitude: number,
    longitude: number,
    name: string,
  ) => {
    onSchoolSearch(latitude, longitude, name);
    setSelectedSchoolName(name); // 선택된 학교 이름을 저장
  };

  return (
    <div className="school-search">
      <div className="search-wrapper">
        <SearchBar />
        <Btn text="학교 검색" onClick={handleSearch} />
      </div>
      {isSearched && (
        <SchoolList
          onSchoolSearch={handleSchoolSearch}
          selectedSchoolName={selectedSchoolName}
        />
      )}
    </div>
  );
};

export default SchoolSearch;

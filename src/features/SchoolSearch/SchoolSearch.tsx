import { useState } from 'react';
import Btn from 'src/components/Button/Button';
import { useSchoolContext } from 'src/contexts/SchoolContext';
import SearchBar from '../SearchBar/SearchBar';
import SchoolList from './SchoolList';
import './SchoolSearch.css';

const SchoolSearch = () => {
  const { selectedSchool, setSelectedSchool } = useSchoolContext();
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = () => {
    setIsSearched(true);
  };

  return (
    <div className="school-search">
      <div className="search-container">
        <SearchBar />
        <Btn text="학교 검색" onClick={handleSearch} />
      </div>
      {isSearched && (
        <SchoolList
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
        />
      )}
    </div>
  );
};

export default SchoolSearch;

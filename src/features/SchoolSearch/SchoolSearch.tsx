import { useState } from 'react';
import Btn from 'src/components/Button/Button';
import SearchBar from '../SearchBar/SearchBar';
import SchoolList from './SchoolList';
import './SchoolSearch.css';

const SchoolSearch = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색어 상태

  const handleSearch = () => {
    setIsSearched(true);
  };

  return (
    <div className="school-search">
      <div className="search-container">
        <SearchBar
          setSearchKeyword={setSearchKeyword}
          handleSearch={handleSearch}
          isSearched={isSearched}
        />
        <Btn text="학교 검색" onClick={handleSearch} />
      </div>
      {isSearched && <SchoolList name={searchKeyword} />}
    </div>
  );
};

export default SchoolSearch;

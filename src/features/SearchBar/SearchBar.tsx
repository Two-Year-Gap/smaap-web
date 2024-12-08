import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import './SearchBar.css';

interface SearchBarProps {
  setSearchKeyword: (keyword: string) => void;
  handleSearch: () => void;
  isSearched: boolean;
}

const SearchBar = ({
  setSearchKeyword,
  handleSearch,
  isSearched,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSearched) {
      setSearchKeyword(e.target.value); // 입력값 업데이트
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // 엔터 키 입력 시 검색 실행
    }
  };

  return (
    <div className={`search-bar ${isFocused ? 'selected' : ''}`}>
      <input
        placeholder="학교 검색"
        maxLength={20}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange} // 입력값 변경 감지
        onKeyDown={handleKeyDown}
      />
      <SearchIcon className="search-icon" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;

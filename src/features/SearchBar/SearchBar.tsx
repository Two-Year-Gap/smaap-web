import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import './SearchBar.css';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`search-bar ${isFocused ? 'selected' : ''}`}>
      <input
        placeholder="학교 검색"
        maxLength={20}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <SearchIcon className="search-icon" />
    </div>
  );
};

export default SearchBar;

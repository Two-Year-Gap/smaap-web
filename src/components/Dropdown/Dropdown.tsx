import { useState } from 'react';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow_down.svg';
import './Dropdown.css';
import DropdownItem from './DropdownItem';

interface DropdownProps {
  label: string; // 드롭다운의 레이블, 예: '학교 구분'
  items: string[]; // 드롭다운 아이템 목록, 예: ['전체', '초등학교', '중학교', '고등학교']
}

const Dropdown = ({ label, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [isFirstRender, setIsFirstRender] = useState(true); // 초기 렌더링 여부 상태

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    setIsFirstRender(false); // 첫 렌더링 후 상태를 false로 업데이트
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-label">
        <span>
          {isFirstRender && selectedItem === items[0] ? label : selectedItem}
        </span>
        <ArrowDownIcon />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <DropdownItem
              key={index}
              item={item}
              onSelect={() => handleSelect(item)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

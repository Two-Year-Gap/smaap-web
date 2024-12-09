import { useEffect, useState } from 'react';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow_down.svg';
import './Dropdown.css';
import DropdownItem from './DropdownItem';

interface DropdownProps {
  label: string; // 드롭다운의 레이블, 예: '학교 구분'
  items: string[]; // 드롭다운 아이템 목록, 예: ['전체', '초등학교', '중학교', '고등학교']
  value: string; // 외부에서 전달받은 선택된 값
  onChange?: (value: string) => void;
}

const Dropdown = ({ label, items, value, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(value || items[0]);
  const [isFirstRender, setIsFirstRender] = useState(true); // 초기 렌더링 여부 상태

  // 외부 value 값이 변경되면 selectedItem 상태를 업데이트
  useEffect(() => {
    if (value !== undefined && value !== selectedItem) {
      setSelectedItem(value);
    }
  }, [value, selectedItem]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    setIsFirstRender(false); // 첫 렌더링 후 상태를 false로 업데이트

    // onChange 이벤트 발생
    if (onChange) {
      onChange(item); // 선택된 값을 부모 컴포넌트로 전달
    }
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-label">
        <span>{isFirstRender ? label : selectedItem}</span>
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

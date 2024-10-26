import './Dropdown.css';

interface DropdownItemProps {
  item: string;
  onSelect: () => void; // 클릭 시 호출될 함수
}

const DropdownItem = ({ item, onSelect }: DropdownItemProps) => {
  return (
    <li className="dropdown-item" onClick={onSelect}>
      <span>{item}</span>
    </li>
  );
};

export default DropdownItem;

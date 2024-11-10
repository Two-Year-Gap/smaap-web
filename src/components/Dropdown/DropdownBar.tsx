import Dropdown from './Dropdown';
import RootDropdown from './RootDropdown';

const DropdownBar = () => {
  return (
    <div className="dropdown-bar-wrapper">
      <RootDropdown />
      <Dropdown
        label="학교 구분"
        items={['전체', '초등학교', '중학교', '고등학교']}
      />
      <Dropdown label="공학 구분" items={['전체', '남녀공학', '남', '여']} />
      <Dropdown
        label="구 구분"
        items={[
          '전체',
          '중구',
          '동구',
          '서구',
          '남구',
          '북구',
          '수성구',
          '달서구',
          '달성군',
        ]}
      />
      <Dropdown
        label="동 구분"
        items={[
          '전체',
          '남산동',
          '대봉동',
          '대신동',
          '동인동',
          '봉산동',
          '상서동',
          '성내동',
          '삼덕동',
        ]}
      />
    </div>
  );
};

export default DropdownBar;

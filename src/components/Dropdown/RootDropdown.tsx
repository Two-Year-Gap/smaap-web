import { ReactComponent as LocationIcon } from '../../assets/location.svg';
import { useMapContext } from '../../contexts/MapContext';

const RootDropdown = () => {
  const { userCity } = useMapContext(); // MapContext에서 사용자 위치 가져오기

  return (
    <div className="root-dropdown">
      <LocationIcon />
      <span>{userCity || '대구광역시'}</span>
    </div>
  );
};

export default RootDropdown;

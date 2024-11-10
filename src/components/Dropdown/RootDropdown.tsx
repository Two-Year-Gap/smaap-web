import { ReactComponent as LocationIcon } from '../../assets/location_on.svg';
import { useMap } from '../../contexts/MapContext';

const RootDropdown = () => {
  const { userCity } = useMap(); // MapContext에서 사용자 위치 가져오기

  return (
    <div className="root-dropdown">
      <LocationIcon />
      <span>{userCity || '대구광역시'}</span>
    </div>
  );
};

export default RootDropdown;

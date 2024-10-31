import { useMap } from 'src/contexts/MapContext';
import { ReactComponent as LocationIcon } from '../../assets/location_on.svg';

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

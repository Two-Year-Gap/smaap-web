import { useBusinessContext } from 'src/contexts/BusinessContext';
import { ReactComponent as CategoryIcon } from '../../assets/label/business.svg';
import './InfoLabel.css';

const BusinessInfo = () => {
  const { selectedBusiness } = useBusinessContext();
  return (
    <div className={`info-label business ${!selectedBusiness ? 'hidden' : ''}`}>
      <CategoryIcon />
      <div className="label-container business">
        <div>
          {selectedBusiness?.icon}
          <span>{selectedBusiness?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;

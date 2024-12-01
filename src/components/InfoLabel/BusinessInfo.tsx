import { useBusinessContext } from 'src/contexts/BusinessContext';
import { ReactComponent as AllIcon } from '../../assets/category/all.svg';
import { ReactComponent as CategoryIcon } from '../../assets/label/business.svg';
import './InfoLabel.css';

const BusinessInfo = () => {
  const { selectedBusiness } = useBusinessContext();
  return (
    <div className="info-label business">
      <CategoryIcon />
      <div className="label-container business">
        <div>
          {selectedBusiness?.icon || <AllIcon />}
          <span>{selectedBusiness?.name || '전체'}</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;

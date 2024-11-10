import Btn from 'src/components/Button/Button';
import './BusinessSelect.css';

interface BusinessSelectProps {
  onBusinessSelect: (latitude: number, longitude: number) => void;
}

const BusinessSelect = ({ onBusinessSelect }: BusinessSelectProps) => {
  return (
    <div>
      <Btn text="선택" />
    </div>
  );
};

export default BusinessSelect;

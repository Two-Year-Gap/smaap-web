import Btn from 'src/components/Button/Button';
import { useBusinessContext } from 'src/contexts/BusinessContext';
import { ReactComponent as AllIcon } from '../../assets/apps.svg';
import { ReactComponent as SellIcon } from '../../assets/local_mall.svg';
import { ReactComponent as EducationIcon } from '../../assets/mode_edit.svg';
import { ReactComponent as FoodIcon } from '../../assets/restaurant.svg';
import { ReactComponent as ServiceIcon } from '../../assets/volunteer_activism.svg';
import './BusinessSelect.css';

const BusinessSelect = () => {
  const { selectedCategory, setSelectedCategory } = useBusinessContext(); // Context 사용
  const categories = [
    { id: '전체', name: '전체', Icon: AllIcon },
    { id: '요식업', name: '요식업', Icon: FoodIcon },
    { id: '서비스업', name: '서비스업', Icon: ServiceIcon },
    { id: '소매업', name: '소매업', Icon: SellIcon },
    { id: '교육서비스업', name: '교육서비스업', Icon: EducationIcon },
  ];

  return (
    <div className="business-select">
      <div className="select-container">
        <div className="select-menu">
          <span className="select-title">업종</span>
          <div className="select-category-list">
            {categories.map(({ id, name, Icon }) => (
              <div
                key={id}
                className={`select-category-item ${
                  selectedCategory === id ? 'selected' : ''
                }`}
                onClick={() => setSelectedCategory(id)}
              >
                <Icon className="icon" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
        <Btn text="선택" />
      </div>
    </div>
  );
};

export default BusinessSelect;

import { useEffect, useState } from 'react';
import Btn from 'src/components/Button/Button';
import { useBusinessContext } from 'src/contexts/BusinessContext';
import { fetchBusinesses } from 'src/services/businessService';
import { Business } from 'src/types/business';
import { ReactComponent as AllIcon } from '../../assets/category/all.svg';
import { ReactComponent as EducationIcon } from '../../assets/category/education.svg';
import { ReactComponent as FoodIcon } from '../../assets/category/food.svg';
import { ReactComponent as SellIcon } from '../../assets/category/sell.svg';
import { ReactComponent as ServiceIcon } from '../../assets/category/service.svg';
import './BusinessSelect.css';

const businessesIcon = [
  { id: 0, icon: <AllIcon /> },
  { id: 1, icon: <FoodIcon /> },
  { id: 2, icon: <ServiceIcon /> },
  { id: 3, icon: <SellIcon /> },
  { id: 4, icon: <EducationIcon /> },
];

const BusinessSelect = () => {
  const { selectedBusiness, setSelectedBusiness } = useBusinessContext();
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const fetchedBusinesses = await fetchBusinesses();

        // 아이콘 매핑
        const businessesWithIcons = fetchedBusinesses.map((business) => {
          const iconObj = businessesIcon.find(
            (item) => item.id === business.id,
          );
          return { ...business, icon: iconObj?.icon };
        });

        // "전체" 항목 추가
        const allBusiness = {
          id: 0,
          name: '전체',
          icon: businessesIcon.find((item) => item.id === 0)?.icon,
        };

        setBusinesses([allBusiness, ...businessesWithIcons]);
      } catch (error) {
        console.error('Load businesses error: ', error);
      }
    };

    loadBusinesses();
  }, []);

  return (
    <div className="business-select">
      <div className="select-container">
        <div className="select-menu">
          <span className="select-title">업종</span>
          <div className="select-category-list">
            {businesses.map((business) => (
              <div
                key={business.id}
                className={`select-category-item ${
                  selectedBusiness === business ? 'selected' : ''
                }`}
                onClick={() => setSelectedBusiness(business)}
              >
                {business.icon}
                <span>{business.name}</span>
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

import { useEffect, useState } from 'react';
import { useNeighborhoodContext } from 'src/contexts/NeighborhoodContext';
import {
  District,
  fetchDistricts,
  fetchNeighborhoods,
  Neighborhood,
} from 'src/services/regionService';
import Dropdown from './Dropdown';
import RootDropdown from './RootDropdown';

const DropdownBar = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const { neighborhoodId, setNeighborhoodId } = useNeighborhoodContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDistricts = async () => {
      try {
        setIsLoading(true);
        const districtData = await fetchDistricts();
        setDistricts(districtData);
      } catch (error) {
        console.error('Failed to load districts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDistricts();
  }, []);

  useEffect(() => {
    if (!selectedDistrict) {
      setNeighborhoods([]);
      setNeighborhoodId(null);
      return;
    }

    const loadNeighborhoods = async () => {
      try {
        setIsLoading(true);
        const neighborhoodData = await fetchNeighborhoods(selectedDistrict);
        setNeighborhoods(neighborhoodData);
      } catch (error) {
        console.error('Failed to load neighborhoods:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNeighborhoods();
  }, [selectedDistrict, setNeighborhoodId]);

  const handleNeighborhoodChange = (value: string) => {
    const selectedNeighborhood = neighborhoods.find(
      (neighborhood) => neighborhood.name === value,
    );
    setNeighborhoodId(selectedNeighborhood ? selectedNeighborhood.id : null); // Context 상태 업데이트
  };

  return (
    <div className="dropdown-bar-wrapper">
      <RootDropdown />
      {!isLoading && (
        <>
          <Dropdown
            label="학교 구분"
            items={['전체', '초등학교', '중학교', '고등학교']}
          />
          <Dropdown
            label="공학 구분"
            items={['전체', '남녀공학', '남', '여']}
          />
          <Dropdown
            label="구 구분"
            items={['전체', ...districts.map((district) => district.name)]}
            onChange={(value) => {
              const district = districts.find((d) => d.name === value);
              setSelectedDistrict(district ? district.id : null);
            }}
          />
          <Dropdown
            label="동 구분"
            items={[
              '전체',
              ...neighborhoods.map((neighborhood) => neighborhood.name),
            ]}
            onChange={handleNeighborhoodChange} // Context 상태 업데이트
          />
        </>
      )}
    </div>
  );
};

export default DropdownBar;

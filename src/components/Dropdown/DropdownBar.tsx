import { useEffect, useState } from 'react';
import { useDropdownContext } from 'src/contexts/DropdownContext';
import { useSchoolContext } from 'src/contexts/SchoolContext';
import {
  District,
  fetchDistricts,
  fetchNeighborhoods,
  Neighborhood,
} from 'src/services/regionService';
import Dropdown from './Dropdown';
import RootDropdown from './RootDropdown';

const DropdownBar = () => {
  const {
    type,
    setType,
    gender,
    setGender,
    district,
    setDistrict,
    neighborhood,
    setNeighborhood,
  } = useDropdownContext();
  const { selectedSchool } = useSchoolContext();
  const [districts, setDistricts] = useState<District[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
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
    if (!selectedDistrict) return;

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
  }, [selectedDistrict]);

  useEffect(() => {
    if (!selectedSchool) return;

    // Update dropdowns when selectedSchool changes
    const schoolType =
      selectedSchool.type === 'HIGH'
        ? '고등학교'
        : selectedSchool.type === 'MIDDLE'
          ? '중학교'
          : '초등학교';

    const schoolGender =
      selectedSchool.gender === 'COEDUCATIONAL'
        ? '남녀공학'
        : selectedSchool.gender === 'BOYS_ONLY'
          ? '남'
          : '여';

    const addressParts = selectedSchool.lotNumberAddress.split(' ');
    const schoolDistrict = addressParts[1];
    const schoolNeighborhood = addressParts[2];

    setType(schoolType);
    setGender(schoolGender);
    setDistrict(schoolDistrict);
    setNeighborhood(schoolNeighborhood);

    const districtData = districts.find((d) => d.name === addressParts[1]);
    if (districtData) {
      setSelectedDistrict(districtData.id);
    }
  }, [
    selectedSchool,
    districts,
    setType,
    setGender,
    setDistrict,
    setNeighborhood,
  ]);

  const handleTypeChange = (value: string) => setType(value);
  const handleGenderChange = (value: string) => setGender(value);
  const handleDistrictChange = (value: string) => {
    const district = districts.find((d) => d.name === value);
    setSelectedDistrict(district ? district.id : null);
    setDistrict(value);
  };
  const handleNeighborhoodChange = (value: string) => setNeighborhood(value);

  return (
    <div className="dropdown-bar-wrapper">
      <RootDropdown />
      {!isLoading && (
        <>
          <Dropdown
            label="학교 구분"
            items={['전체', '초등학교', '중학교', '고등학교']}
            value={type}
            onChange={handleTypeChange}
          />
          <Dropdown
            label="공학 구분"
            items={['전체', '남녀공학', '남', '여']}
            value={gender}
            onChange={handleGenderChange}
          />
          <Dropdown
            label="구 구분"
            items={['전체', ...districts.map((district) => district.name)]}
            value={district}
            onChange={handleDistrictChange}
          />
          <Dropdown
            label="동 구분"
            items={[
              '전체',
              ...neighborhoods.map((neighborhood) => neighborhood.name),
            ]}
            value={neighborhood}
            onChange={handleNeighborhoodChange}
          />
        </>
      )}
    </div>
  );
};

export default DropdownBar;

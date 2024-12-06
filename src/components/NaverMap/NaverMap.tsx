import { useMapContext } from 'src/contexts/MapContext';
import { useMenuOptionContext } from 'src/contexts/MenuOptionContext';
import { useSchoolContext } from 'src/contexts/SchoolContext';
import useNaverMap from 'src/hooks/useNaverMap';
import useRadiusModal from 'src/hooks/useRadiusModal';
import useSchoolMarkers from 'src/hooks/useSchoolMarkers';
import useSelectedSchoolRadius from 'src/hooks/useSelectedSchoolRadius';
import { School } from 'src/types/schools';
import RadiusModal from '../Modal/RadiusModal';
import './NaverMap.css';

const NaverMap = () => {
  const { map } = useMapContext();
  const { selectedOption } = useMenuOptionContext();
  const { selectedSchool, setSelectedSchool } = useSchoolContext();
  const { mapRef, loading } = useNaverMap(); // 지도 초기화
  const { isModalOpen, radius, openModal, closeModal, changeRadius } =
    useRadiusModal();

  const handleMarkerClick = (school: School) => {
    setSelectedSchool(school); // 학교 선택
  };

  // 마커 초기화 및 순서 설정
  useSchoolMarkers({
    map,
    onModalOpen: openModal,
    onMarkerClick: handleMarkerClick,
  });

  // 선택된 학교 처리
  useSelectedSchoolRadius({
    map,
    selectedSchool: selectedOption === '학교 선택' ? selectedSchool : null, // 조건적으로 실행
    radius,
  });

  const handleRadiusChange = (newRadius: number) => {
    changeRadius(newRadius); // 반경 조절
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">지도를 불러오는 중입니다...</div>
      )}
      <div id="map" className="map" ref={mapRef}></div>

      {isModalOpen && selectedSchool && (
        <RadiusModal
          school={selectedSchool}
          radius={radius}
          onClose={closeModal}
          onRadiusChange={handleRadiusChange}
        />
      )}
    </>
  );
};

export default NaverMap;

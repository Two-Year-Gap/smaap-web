import { useAnalysisContext } from 'src/contexts/AnalysisContext';
import { useMapContext } from 'src/contexts/MapContext';
import { useSchoolContext } from 'src/contexts/SchoolContext';
import useNaverMap from 'src/hooks/useNaverMap';
import useRadiusModal from 'src/hooks/useRadiusModal';
import useSchoolMarkers from 'src/hooks/useSchoolMarkers';
import useSelectedSchoolRadius from 'src/hooks/useSelectedSchoolRadius';
import useStoreMarkers from 'src/hooks/useStoreMarkers';
import useWelfareInfraMarkers from 'src/hooks/useWelfareInfraMarkers';
import { School } from 'src/types/schools';
import RadiusModal from '../Modal/RadiusModal';
import './NaverMap.css';

const NaverMap = () => {
  const { map } = useMapContext();
  const { selectedSchool, setSelectedSchool } = useSchoolContext();
  const { selectedAnalysisItem } = useAnalysisContext();
  const { mapRef, loading } = useNaverMap(); // 지도 초기화
  const { isModalOpen, radius, openModal, closeModal, changeRadius } =
    useRadiusModal();

  const welfareInfraType =
    selectedAnalysisItem === '안전비상벨'
      ? 'EMERGENCY_BELL'
      : selectedAnalysisItem === '안전지킴이집'
        ? 'KEEPER_HOUSE'
        : selectedAnalysisItem === 'CCTV'
          ? 'CCTV'
          : null;

  const handleMarkerClick = (school: School) => {
    setSelectedSchool(school); // 학교 선택
  };
  const handleRadiusChange = (newRadius: number) => {
    changeRadius(newRadius); // 반경 조절
  };

  // 학교 마커 표시
  useSchoolMarkers({
    map,
    onModalOpen: openModal,
    onMarkerClick: handleMarkerClick,
  });
  // 선택된 학교 처리
  useSelectedSchoolRadius({ map, radius });

  // 일반 마커 표시
  useStoreMarkers({
    map,
    radius,
    shouldExecute: selectedAnalysisItem === '점포수',
  });
  useWelfareInfraMarkers({
    map,
    radius,
    type: welfareInfraType,
    shouldExecute: Boolean(welfareInfraType), // Pass execution condition
  });
  //useSalesPolygon({ map, year: 2023 });
  //usePopulationPolygon({ map, year: 2023 });

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

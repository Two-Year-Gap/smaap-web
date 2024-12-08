import { useEffect, useRef, useState } from 'react';
import { useBusinessContext } from 'src/contexts/BusinessContext';
import { useSchoolContext } from 'src/contexts/SchoolContext';
import { fetchSchools } from 'src/services/schoolService';
import { School } from 'src/types/schools';
import { calculateDistance } from 'src/utils/calculateDistance';
import '../styles/customMarkers.css';

interface UseSchoolMarkersProps {
  map: NaverMap | null;
  onModalOpen: (school: School) => void;
  onMarkerClick: (school: School) => void;
}

const useSchoolMarkers = ({
  map,
  onModalOpen,
  onMarkerClick,
}: UseSchoolMarkersProps) => {
  const { selectedSchool } = useSchoolContext();
  const { selectedBusiness } = useBusinessContext();
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const infoWindowsRef = useRef<naver.maps.InfoWindow[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1. 데이터 로드 로직 분리
  useEffect(() => {
    const loadSchools = async () => {
      setIsLoading(true);
      try {
        const schoolData = await fetchSchools();
        setSchools(schoolData);
      } catch (error) {
        console.error('Error loading schools:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSchools(); // 데이터 로드
  }, []); // 의존성 없음 (초기 로드 시만 실행)

  // 2. 데이터 로드 후 마커 업데이트
  useEffect(() => {
    if (!map || isLoading) return;

    const updateMarkers = () => {
      if (!map) return;

      // TODO: zoomLevel 변경 인지
      const zoomLevel = map.getZoom();

      // 기존 마커와 InfoWindow 제거
      markersRef.current.forEach((marker) => marker.setMap(null));
      infoWindowsRef.current.forEach((infoWindow) => infoWindow.close());
      markersRef.current = [];
      infoWindowsRef.current = [];

      if (selectedBusiness && selectedSchool) {
        // 선택된 학교의 마커만 표시
        createMarkerWithInfoWindow(selectedSchool, zoomLevel >= 16);
      } else {
        // 조건 2: 3km 반경 내 학교 마커 표시
        const center = map.getCenter() as naver.maps.LatLng;
        const centerLat = center.lat();
        const centerLng = center.lng();

        const filteredSchools = schools.filter((school) => {
          const distance = calculateDistance(
            centerLat,
            centerLng,
            school.latitude,
            school.longitude,
          );
          return distance <= 3000;
        });

        filteredSchools.forEach((school) =>
          createMarkerWithInfoWindow(school, zoomLevel >= 16),
        );
      }
    };

    const createMarkerWithInfoWindow = (school: School, showInfo: boolean) => {
      const position = new naver.maps.LatLng(school.latitude, school.longitude);

      // InfoWindow의 DOM을 명확히 조작하여 생성
      const contentDiv = document.createElement('div');
      contentDiv.className = 'custom-marker';

      const markerContent = document.createElement('div');
      markerContent.className = 'marker-content';
      markerContent.textContent = school.name;

      contentDiv.appendChild(markerContent);

      if (selectedSchool === school && selectedBusiness) {
        const button = document.createElement('button');
        button.className = 'marker-button';
        button.textContent = '반경 설정';

        // 클릭 이벤트 핸들러 추가 (조건 4: 모달 열기)
        button.addEventListener('click', () => {
          onModalOpen(school); // 모달 열기
        });

        contentDiv.appendChild(button);
      }

      const infoWindow = new naver.maps.InfoWindow({
        content: showInfo ? contentDiv : '', // DOM 요소를 content로 전달
        disableAutoPan: true,
        borderWidth: 0,
        backgroundColor: 'transparent',
        zIndex: 200, // InfoWindow를 위로 올리기
        pixelOffset: new naver.maps.Point(0, 0), // 마커 위로 적절히 위치 조정
      });

      // 마커 생성 및 클릭 이벤트 추가
      const marker = new naver.maps.Marker({
        position,
        map,
      });

      // BUG: 업종 선택 후, 반경 원 삭제 안 됨.
      naver.maps.Event.addListener(marker, 'click', () => {
        onMarkerClick(school);
        if (showInfo) {
          setTimeout(() => {
            infoWindow.open(map, marker);
          }, 50);
        }
      });

      markersRef.current.push(marker);
      infoWindowsRef.current.push(infoWindow);
    };

    // 지도 이동 및 확대/축소 이벤트
    const idleListener = naver.maps.Event.addListener(
      map,
      'idle',
      updateMarkers,
    );

    updateMarkers(); // 초기 마커 설정

    return () => {
      // Clean up: 이벤트 리스너 및 마커
      naver.maps.Event.removeListener(idleListener);
      markersRef.current.forEach((marker) => marker.setMap(null));
      infoWindowsRef.current.forEach((infoWindow) => infoWindow.close());
    };
  }, [isLoading, selectedBusiness, selectedSchool, onModalOpen]);
};

export default useSchoolMarkers;

// TODO: 커스텀 오버레이 적용
// const overlaysRef = useRef<CustomOverlay[]>([]);
// const overlay = new CustomOverlay({
//   position,
//   map,
//   content,
//   zIndex: isSelected ? 200 : 100,
// });
// overlaysRef.current.push(overlay);
// TODO: DOM 렌더링 완료 확인 후 InfoWindow 열기
// const waitForDom = () =>
//   new Promise<void>((resolve) => {
//     const observer = new MutationObserver((mutations) => {
//       const isReady = document.querySelector('.custom-marker');
//       if (isReady) {
//         observer.disconnect();
//         resolve();
//       }
//     });

//     observer.observe(document.body, { childList: true, subtree: true });
//   });

// if (showInfo) {
//   await waitForDom();
//   infoWindow.open(map, marker);
// }

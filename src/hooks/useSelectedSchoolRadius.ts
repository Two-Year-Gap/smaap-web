import { useEffect, useRef } from 'react';
import { School } from 'src/types/schools';

interface useSelectedSchoolRadiusProps {
  map: NaverMap | null;
  selectedSchool: School | null;
  radius: number;
}

const useSelectedSchoolRadius = ({
  map,
  selectedSchool,
  radius,
}: useSelectedSchoolRadiusProps) => {
  const circleRef = useRef<naver.maps.Circle | null>(null); // 기존 원을 추적

  useEffect(() => {
    if (!map || !selectedSchool) return;

    // 기존 원 제거
    if (circleRef.current) {
      circleRef.current.setMap(null); // 이전 원을 지도에서 제거
    }

    const schoolLatLng = new window.naver.maps.LatLng(
      selectedSchool.latitude,
      selectedSchool.longitude,
    );

    // 반경 500m 원 추가
    const newCircle = new window.naver.maps.Circle({
      map: map,
      center: schoolLatLng,
      radius: radius,
      strokeColor: '#1d4fff',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: '#60a5fa',
      fillOpacity: 0.3,
    });

    // 새로 생성된 원을 참조로 저장
    circleRef.current = newCircle;

    // 지도 중심 이동
    map.setCenter(schoolLatLng);
    map.setZoom(16);
  }, [map, selectedSchool, radius]);
};

export default useSelectedSchoolRadius;

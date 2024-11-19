// src/hooks/useNaverMap.ts
import { useEffect, useRef, useState } from 'react';
import { useMap } from 'src/contexts/MapContext';

interface UseNaverMapOptions {
  initialCoordinates: { latitude: number; longitude: number };
}

const useNaverMap = ({ initialCoordinates }: UseNaverMapOptions) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { map, setMapInstance, userCoordinates } = useMap();
  const [loading, setLoading] = useState(true);

  // 스크립트 로드 후 지도 초기화 수행
  useEffect(() => {
    if (!mapRef.current || !window.naver || map) return; // 지도 초기화 한 번만 수행

    // 지도 생성
    const initialCenter = userCoordinates || initialCoordinates;
    const newMap = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(
        initialCenter.latitude,
        initialCenter.longitude,
      ),
      zoom: 16,
    });

    setMapInstance(newMap); // 지도 인스턴스를 전역 상태로 설정
    setLoading(false); // 로딩 완료 처리
  }, [setMapInstance, map, userCoordinates, initialCoordinates]);

  // 사용자 위치로 지도 중심 설정
  useEffect(() => {
    if (!map || !userCoordinates) return; // map과 userCoordinates가 모두 있어야 실행

    const userLatLng = new window.naver.maps.LatLng(
      userCoordinates.latitude,
      userCoordinates.longitude,
    );
    map.setCenter(userLatLng);
  }, [map, userCoordinates]); // userCoordinates 변경 시에만 실행

  return { mapRef, loading };
};

export default useNaverMap;

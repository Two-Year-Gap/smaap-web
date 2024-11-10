import { useEffect, useRef, useState } from 'react';
import { useMap } from 'src/contexts/MapContext';
import './NaverMap.css';

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { map, setMapInstance, userCoordinates } = useMap();
  const [loading, setLoading] = useState(true);

  // 기본 좌표 설정 (사용자가 위치를 제공하지 않는 경우)
  const defaultCoordinates = { latitude: 35.8714, longitude: 128.6014 };

  // 스크립트 로드 후 지도 초기화만 수행.
  useEffect(() => {
    // 지도 초기화 한 번만 수행
    if (!mapRef.current || !window.naver || map) return;

    // userCoordinates가 없으면 기본 좌표 사용
    const initialCoordinates = userCoordinates || defaultCoordinates;

    // 지도 생성
    const newMap = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(
        initialCoordinates.latitude,
        initialCoordinates.longitude,
      ),
      zoom: 18,
    });

    // 지도 인스턴스를 전역 상태로 설정
    setMapInstance(newMap);

    setLoading(false); // 로딩 완료 처리
  }, [setMapInstance, map, userCoordinates]);

  useEffect(() => {
    if (!map || !userCoordinates) return; // map과 userCoordinates가 모두 있어야 실행

    // 사용자 위치로 지도 중심 설정
    const userLatLng = new window.naver.maps.LatLng(
      userCoordinates.latitude,
      userCoordinates.longitude,
    );
    map.setCenter(userLatLng);

    // 마커 추가
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(35.8695, 128.5941),
      map: map,
    });
  }, [map, userCoordinates]); // userCoordinates 변경 시에만 실행

  return (
    <>
      {loading && (
        <div className="loading-overlay">지도를 불러오는 중입니다...</div>
      )}
      <div id="map" className="map" ref={mapRef}></div>
    </>
  );
};

export default NaverMap;

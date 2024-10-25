import { useEffect, useRef } from 'react';
import './NaverMap.css';

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  // 스크립트 로드 후 지도 초기화

  // 지도 초기화만 수행.
  useEffect(() => {
    if (!mapRef.current || !window.naver) return;

    // 지도 생성
    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37.5665, 126.978),
      zoom: 10,
    });

    // 마커 추가
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(37.5665, 126.978),
      map: map,
    });
  }, []);

  return <div className="map" ref={mapRef}></div>;
};

export default NaverMap;

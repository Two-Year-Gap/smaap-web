import { useEffect, useRef, useState } from 'react';
import './NaverMap.css';

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // 스크립트 로드 후 지도 초기화만 수행.
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

    // 로딩 완료 처리
    setLoading(false);
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-overlay">지도를 불러오는 중입니다...</div>
      )}
      <div className="map" ref={mapRef}></div>
    </>
  );
};

export default NaverMap;

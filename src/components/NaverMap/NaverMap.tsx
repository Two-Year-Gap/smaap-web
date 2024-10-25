import { useEffect, useRef } from 'react';
import './NaverMap.css';

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 네이버 지도 스크립트 동적 추가
    const loadNaverMapScript = () => {
      const naverMapScript = document.createElement('script');
      naverMapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_CLIENT_ID}`;
      naverMapScript.defer = true;

      // 스크립트 로드 후 지도 초기화
      naverMapScript.onload = initializeMap;
      document.head.appendChild(naverMapScript); // 스크립트를 헤드에 추가
    };

    const initializeMap = () => {
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
    };

    // 네이버 지도 스크립트 로드
    if (!window.naver) {
      loadNaverMapScript();
    } else {
      initializeMap();
    }
  }, []);

  return <div className="map" ref={mapRef}></div>;
};

export default NaverMap;

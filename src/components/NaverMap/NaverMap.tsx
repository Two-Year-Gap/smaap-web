import { useEffect, useState } from 'react';
import { useMap } from 'src/contexts/MapContext';
import useNaverMap from 'src/hooks/useNaverMap';
import { useTM128 } from 'src/hooks/useTM128';
import { schools } from '../../data/schools';
import './NaverMap.css';

interface NaverMapProps {
  mapData: {
    type: '학교 검색' | '업종 선택' | '분석 개요';
    coordinates?: { latitude: number; longitude: number };
    radius?: number;
    name?: string;
  } | null;
}

const NaverMap = ({ mapData }: NaverMapProps) => {
  const defaultCoordinates = { latitude: 35.8714, longitude: 128.6014 }; // 기본 좌표
  const { mapRef, loading } = useNaverMap({
    initialCoordinates: defaultCoordinates,
  });
  const { map } = useMap();
  const { toTM128 } = useTM128();
  const [schoolCircle, setSchoolCircle] = useState<naver.maps.Circle | null>(
    null,
  ); // 학교 검색

  // 모든 학교에 마커 추가
  useEffect(() => {
    if (!map) return;

    schools.forEach((school) => {
      // WGS84 좌표를 TM128로 변환
      const tm128Position = toTM128({
        latitude: school.latitude,
        longitude: school.longitude,
      });

      // 마커 생성
      const marker = new window.naver.maps.Marker({
        position: tm128Position,
        map: map,
      });

      // 학교 이름을 표시하는 InfoWindow 생성
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div class="info-window">${school.name}</div>`,
        disableAutoPan: true,
        borderWidth: 0,
        backgroundColor: 'transparent',
      });

      // 마커 아래에 InfoWindow 표시
      //infoWindow.open(map, marker);

      // 마커 클릭 시 InfoWindow 열기
      window.naver.maps.Event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker);
      });
    });
  }, [map, schools]);
  /*
  // 특정 학교 선택 시 해당 좌표에만 500m 원 추가
  useEffect(() => {
    if (!map || !schoolCoordinates) return;

    // 기존의 원을 제거
    if (schoolCircle) {
      schoolCircle.setMap(null);
    }

    const schoolLatLng = new window.naver.maps.LatLng(
      schoolCoordinates.latitude,
      schoolCoordinates.longitude,
    );

    // 새로운 500m 반경 원을 추가
    const newCircle = new window.naver.maps.Circle({
      map: map,
      center: schoolLatLng,
      radius: 500,
      strokeColor: '#1d4fff',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: '#60a5fa',
      fillOpacity: 0.3,
    });

    setSchoolCircle(newCircle);
  }, [map, schoolCoordinates, schoolCircle, toTM128]);
  */

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

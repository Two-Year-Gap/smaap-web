import { useCallback } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

// WGS84 좌표를 TM128로 변환하는 커스텀 훅
export const useTM128 = () => {
  const toTM128 = useCallback((coordinates: Coordinates) => {
    const { latitude, longitude } = coordinates;
    const wgs84LatLng = new window.naver.maps.LatLng(latitude, longitude);
    return window.naver.maps.TransCoord.fromLatLngToTM128(wgs84LatLng);
  }, []);

  return { toTM128 };
};

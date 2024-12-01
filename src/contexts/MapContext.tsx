// src/context/MapContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

interface MapProviderProps {
  children: React.ReactNode;
}

interface MapContextType {
  map: NaverMap | null; // 지도 인스턴스 객체
  userCity: string; // 사용자 시도별 위치를 저장할 상태
  userCoordinates: { latitude: number; longitude: number } | null; // 사용자 좌표 상태
  setMapInstance: (mapInstance: NaverMap) => void; // map 인스턴스를 설정하는 함수
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: MapProviderProps) => {
  const [map, setMap] = useState<NaverMap | null>(null);
  const [userCity, setUserCity] = useState(''); // 사용자 시도별 위치
  const [userCoordinates, setUserCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null); // 사용자 좌표

  // map 인스턴스를 설정하는 함수
  const setMapInstance = (mapInstance: NaverMap) => {
    setMap(mapInstance);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserCity('Geolocation을 지원하지 않습니다.');
      return;
    }

    // Geolocation API를 사용해 사용자 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoordinates({ latitude, longitude });

        // LatLng 객체로 파싱
        const userLatLng = new naver.maps.LatLng(latitude, longitude);

        // Reverse Geocoding을 통해 주소 얻기
        naver.maps.Service.reverseGeocode(
          {
            coords: userLatLng,
            orders: String(naver.maps.Service.OrderType.ADDR),
          },
          (status, response) => {
            if (status === naver.maps.Service.Status.OK) {
              /*const address =
                response.v2.address.jibunAddress ||
                response.v2.address.roadAddress;
              setUserCity(address || '위치를 확인할 수 없습니다.');*/
              // 상위 레벨 주소 추출
              const addressInfo = response.v2.results[0];
              const area1 = addressInfo.region.area1.name; // 시/도 정보

              setUserCity(area1 || '위치를 확인할 수 없습니다.');
            }
          },
        );
      },
      (error) => {
        console.error('위치 정보를 가져올 수 없습니다.', error);
        setUserCity('위치 정보를 가져올 수 없습니다.');
      },
    );
  }, []);

  return (
    <MapContext.Provider
      value={{ map, userCity, userCoordinates, setMapInstance }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap은 MapProvider 내에서 사용해야 합니다.');
  }
  return context;
};

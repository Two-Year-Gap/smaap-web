import { useEffect, useRef, useState } from 'react';
import { useAnalysisContext } from 'src/contexts/AnalysisContext';
import { useSchoolContext } from 'src/contexts/SchoolContext';
import {
  fetchWelfareInfra,
  WelfareInfra,
  WelfareInfraApiParams,
} from 'src/services/welfareInfraService';
import { calculateDistance } from 'src/utils/calculateDistance';
import emergencyBellMarkerIcon from '../assets/marker/bell_point.png';
import cctvMarkerIcon from '../assets/marker/cctv_point.png';
import keeperHouseMarkerIcon from '../assets/marker/house_point.png';

interface UseWelfareInfraMarkersProps {
  map: NaverMap | null;
  radius: number;
  type: 'EMERGENCY_BELL' | 'KEEPER_HOUSE' | 'CCTV' | null;
  shouldExecute?: boolean; // Optional flag to control execution
}

const useWelfareInfraMarkers = ({
  map,
  radius,
  type,
  shouldExecute = true,
}: UseWelfareInfraMarkersProps) => {
  const { selectedSchool } = useSchoolContext();
  const { selectedAnalysisItem } = useAnalysisContext();
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [welfareInfras, setWelfareInfras] = useState<WelfareInfra[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const markerIcons = {
    EMERGENCY_BELL: emergencyBellMarkerIcon,
    KEEPER_HOUSE: keeperHouseMarkerIcon,
    CCTV: cctvMarkerIcon,
  };

  const markerIcon = type ? markerIcons[type] : null; // 유효한 type에만 icon 설정

  useEffect(() => {
    if (!shouldExecute || !selectedSchool || !selectedAnalysisItem) {
      return;
    }

    const loadWelfareInfra = async () => {
      setIsLoading(true);
      try {
        const params: WelfareInfraApiParams = {
          latitude: selectedSchool.latitude,
          longitude: selectedSchool.longitude,
          range: radius,
          type: type!,
          size: 250,
        };

        const infraData = await fetchWelfareInfra(params);
        console.log('welfare fetch: ', infraData);

        setWelfareInfras(infraData);
      } catch (error) {
        console.error('Error fetching welfare infra:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWelfareInfra();
  }, [selectedSchool, selectedAnalysisItem, radius, type, shouldExecute]);

  useEffect(() => {
    if (!map || !selectedSchool || welfareInfras.length === 0 || isLoading)
      return;

    const updateMarkers = () => {
      // Clear previous markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Filter markers within radius
      const filteredMarkers = welfareInfras.filter((infra) => {
        const distance = calculateDistance(
          selectedSchool.latitude,
          selectedSchool.longitude,
          infra.latitude,
          infra.longitude,
        );
        return distance <= radius;
      });

      // Add new markers
      markersRef.current = filteredMarkers.map((infra) => {
        const position = new naver.maps.LatLng(infra.latitude, infra.longitude);

        const marker = new naver.maps.Marker({
          position,
          map,
          title: infra.type,
          icon: {
            url: markerIcon as string,
            size: new naver.maps.Size(21, 31.5),
            scaledSize: new naver.maps.Size(21, 31.5),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(10.5, 15.25),
          },
        });

        return marker;
      });
    };

    updateMarkers();

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [
    isLoading,
    welfareInfras,
    selectedSchool,
    selectedAnalysisItem,
    radius,
    shouldExecute,
  ]);
};

export default useWelfareInfraMarkers;

import { useEffect, useRef, useState } from 'react';
import { useAnalysisContext } from 'src/contexts/AnalysisContext';
import { useBusinessContext } from 'src/contexts/BusinessContext';
import { useSchoolContext } from 'src/contexts/SchoolContext';
import { fetchDistricts, fetchNeighborhoods } from 'src/services/regionService';
import { fetchStores, Store, StoreApiParams } from 'src/services/storeService';
import { calculateDistance } from 'src/utils/calculateDistance';
import storeMarker from '../assets/marker/store_point.png';

interface UseStoreMarkersProps {
  map: NaverMap | null;
  radius: number;
  shouldExecute?: boolean; // Optional flag to control execution
}

const useStoreMarkers = ({
  map,
  radius,
  shouldExecute = true,
}: UseStoreMarkersProps) => {
  const { selectedSchool } = useSchoolContext();
  const { selectedBusiness } = useBusinessContext();
  const { selectedAnalysisItem } = useAnalysisContext();
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const markerIcon = {
    url: storeMarker, // 이미지 경로
    size: new naver.maps.Size(21, 31.5), // 원래 이미지 크기
    scaledSize: new naver.maps.Size(21, 31.5), // 실제 지도에서 보이는 크기
    origin: new naver.maps.Point(0, 0), // 이미지 시작점
    anchor: new naver.maps.Point(10.5, 15.25), // 이미지 중심점 (마커 위치 기준)
  };

  useEffect(() => {
    // Only execute when a specific analysis item is selected
    if (
      !shouldExecute ||
      !selectedSchool ||
      !selectedBusiness ||
      !selectedAnalysisItem
    ) {
      setStores([]);
      return;
    }

    const loadStores = async () => {
      setIsLoading(true);
      try {
        // Step 1: Extract district and neighborhood names from lotNumberAddress
        const addressParts = selectedSchool.lotNumberAddress.split(' ');
        const districtName = addressParts[1]; // 2nd word
        const neighborhoodName = addressParts[2]; // 3rd word

        // Step 2: Fetch all districts
        const districts = await fetchDistricts();
        const matchedDistrict = districts.find(
          (district) => district.name === districtName,
        );
        if (!matchedDistrict) {
          console.warn('District not found.');
          setStores([]);
          return;
        }

        // Step 3: Fetch neighborhoods for the matched district
        const neighborhoods = await fetchNeighborhoods(matchedDistrict.id);
        const matchedNeighborhood = neighborhoods.find(
          (neighborhood) => neighborhood.name === neighborhoodName,
        );
        if (!matchedNeighborhood) {
          console.warn('Neighborhood not found.');
          setStores([]);
          return;
        }

        // Step 4: Fetch stores with matched neighborhoodId
        const params: StoreApiParams = {
          neighborhoodId: matchedNeighborhood.id,
          latitude: selectedSchool.latitude,
          longitude: selectedSchool.longitude,
          range: radius,
          size: 100, // Default value
        };
        if (selectedBusiness.id !== 0) {
          params.businessId = selectedBusiness.id; // Add businessId if not '전체'
        }

        const storeData = await fetchStores(params);
        setStores(storeData);
      } catch (error) {
        console.error('Error loading stores:', error);
        setStores([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadStores();
  }, [
    selectedSchool,
    selectedBusiness,
    selectedAnalysisItem,
    radius,
    shouldExecute,
  ]);

  useEffect(() => {
    if (!map || !selectedSchool || stores.length === 0 || isLoading) return;

    const updateMarkers = () => {
      // Clear previous markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Filter markers within radius and create new markers
      const filteredMarkers = stores.filter((store) => {
        const distance = calculateDistance(
          selectedSchool.latitude,
          selectedSchool.longitude,
          store.latitude,
          store.longitude,
        );
        return distance <= radius;
      });

      markersRef.current = filteredMarkers.map((store) => {
        const position = new naver.maps.LatLng(store.latitude, store.longitude);

        const marker = new naver.maps.Marker({
          position,
          map,
          title: store.name,
          icon: markerIcon, // 커스텀 아이콘 설정
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
    stores,
    selectedSchool,
    selectedBusiness,
    selectedAnalysisItem,
    radius,
    shouldExecute,
  ]);
};

export default useStoreMarkers;

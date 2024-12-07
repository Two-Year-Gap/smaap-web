import { useEffect, useRef, useState } from 'react';
import { useAnalysisContext } from 'src/contexts/AnalysisContext';
import { useBusinessContext } from 'src/contexts/BusinessContext';
import { useSchoolContext } from 'src/contexts/SchoolContext';
import { fetchGeoJson, GeoJson } from 'src/services/geoJsonService';
import { fetchDistricts, fetchNeighborhoods } from 'src/services/regionService';
import {
  fetchSales,
  SalesApiParams,
  SalesData,
} from 'src/services/salesService';

interface UseSalesPolygonProps {
  map: NaverMap | null;
  year: number;
}

const useSalesPolygon = ({ map, year }: UseSalesPolygonProps) => {
  const { selectedSchool } = useSchoolContext();
  const { selectedBusiness } = useBusinessContext();
  const { selectedAnalysisItem } = useAnalysisContext();
  const polygonsRef = useRef<naver.maps.Polygon[]>([]);
  const [sales, setSales] = useState<SalesData>({
    salesAmount: 0,
    salesCount: 0,
  });
  const [geoJson, setGeoJson] = useState<GeoJson>({
    type: 'FeatureCollection',
    features: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedSchool || !selectedBusiness || !selectedAnalysisItem) return;

    const loadSalesData = async () => {
      setIsLoading(true); // Start loading
      try {
        // Extract district and neighborhood names from the school address
        const addressParts = selectedSchool.lotNumberAddress.split(' ');
        const districtName = addressParts[1];
        const neighborhoodName = addressParts[2];

        // Fetch matching district and neighborhood IDs
        const districts = await fetchDistricts();
        const matchedDistrict = districts.find((d) => d.name === districtName);
        if (!matchedDistrict) {
          console.warn('District not found.');
          return;
        }

        const neighborhoods = await fetchNeighborhoods(matchedDistrict.id);
        const matchedNeighborhood = neighborhoods.find(
          (n) => n.name === neighborhoodName,
        );
        if (!matchedNeighborhood) {
          console.warn('Neighborhood not found.');
          return;
        }

        // Fetch sales data
        const params: SalesApiParams = {
          year,
          neighborhood_id: matchedNeighborhood.id,
        };
        if (selectedBusiness.id !== 0) {
          params.business_id = selectedBusiness.id;
        }
        console.log(params);
        const salesData = await fetchSales(params);
        setSales(salesData);

        const geoJsonData = await fetchGeoJson();
        setGeoJson(geoJsonData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    loadSalesData();
  }, [selectedSchool, selectedBusiness, selectedAnalysisItem, year]);

  useEffect(() => {
    if (!map || !selectedSchool || !sales || geoJson.features.length === 0)
      return;

    const updatePolygons = () => {
      // Clear existing polygons
      polygonsRef.current.forEach((polygon) => polygon.setMap(null));
      polygonsRef.current = [];

      // Extract the neighborhood name from the school's address
      const neighborhoodName = selectedSchool.lotNumberAddress.split(' ')[2];

      // Find the matching feature in the GeoJSON
      const matchingFeature = geoJson.features.find((feature) =>
        feature.properties.adm_nm.includes(neighborhoodName),
      );
      if (!matchingFeature) {
        console.warn(
          'No matching GeoJSON feature found for:',
          neighborhoodName,
        );
        return;
      }

      // Extract MultiPolygon coordinates and draw them on the map
      const multiPolygonCoordinates = matchingFeature.geometry.coordinates;
      multiPolygonCoordinates.forEach((polygonCoordinates: number[][][]) => {
        polygonCoordinates.forEach((ringCoordinates: number[][]) => {
          const polygonPath = ringCoordinates.map(
            (coords: number[]): [number, number] => [coords[1], coords[0]], // Swap lat, lng
          );

          const polygon = new naver.maps.Polygon({
            map,
            paths: polygonPath as unknown as naver.maps.ArrayOfCoords[],
            fillColor: '#FFB74D',
            fillOpacity: 0.5,
            strokeColor: '#FF6F00',
            strokeOpacity: 0.8,
            strokeWeight: 2,
          });

          polygonsRef.current.push(polygon);
        });
      });

      // Add an InfoWindow or overlay to display sales information
      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding: 8px; font-size: 14px; font-weight: bold;">
                    매출액: ${sales.salesAmount.toLocaleString()}원
                  </div>`,
        position:
          polygonsRef.current[0].getBounds()?.getCenter() || map.getCenter(),
        borderWidth: 0,
        backgroundColor: 'white',
        disableAutoPan: true,
      });

      setTimeout(() => {
        infoWindow.open(map);
      }, 50);
    };

    updatePolygons();

    return () => {
      polygonsRef.current.forEach((polygon) => polygon.setMap(null));
      polygonsRef.current = [];
    };
  }, [isLoading, sales, selectedAnalysisItem]);
};

export default useSalesPolygon;

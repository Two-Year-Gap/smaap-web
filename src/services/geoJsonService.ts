import simplifyGeoJson from '../assets/geoJson/simplified_HangJeongDong_daegu.geojson';

// GeoJSON Feature 인터페이스
export interface GeoJsonFeature {
  type: 'Feature';
  properties: {
    adm_nm: string; // e.g., "대구광역시 북구 구암동"
  };
  geometry: {
    type: 'MultiPolygon';
    coordinates: number[][][][];
  };
}

// GeoJSON 전체 구조 인터페이스
export interface GeoJson {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
}

// GeoJSON 데이터를 가져오는 함수
export const fetchGeoJson = async (): Promise<GeoJson> => {
  try {
    // 정적 데이터를 바로 반환
    return simplifyGeoJson;
  } catch (error) {
    console.error('Error fetching GeoJSON:', error);
    throw error;
  }
};

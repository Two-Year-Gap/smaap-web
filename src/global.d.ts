// 네이버 지도 타입 정의
type NaverMap = naver.maps.Map;
type NaverMarker = naver.maps.Marker;

// SVG 모듈 타입 정의
declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >; // 리액트 컴포넌트 용도 지원
  const src: string; // 파일 경로 용도 지원
  export default src;
}

declare namespace naver {
  const maps: typeof import('@types/navermaps');
}

// 네이버 지도 관련 타입 확장
declare namespace naver.maps {
  class OverlayView {
    setMap(map: NaverMap | null): void;
    getMap(): NaverMap | null;
    getPanes(): {
      overlayLayer: HTMLElement;
    };
    getProjection(): Projection;
    onAdd(): void;
    draw(): void;
    onRemove(): void;
  }

  interface Projection {
    fromLatLngToDivPixel(latlng: naver.maps.LatLng): { x: number; y: number };
    fromDivPixelToLatLng(pixel: { x: number; y: number }): naver.maps.LatLng;
  }

  class CustomOverlay extends OverlayView {
    constructor(options: {
      map?: NaverMap | null;
      position: naver.maps.LatLng;
      content: HTMLElement | string;
      zIndex?: number;
      visible?: boolean;
    });

    setPosition(position: naver.maps.LatLng): void;
    getPosition(): naver.maps.LatLng;
    setVisible(visible: boolean): void;
    getVisible(): boolean;
    setContent(content: HTMLElement | string): void;
    getContent(): HTMLElement | string;
    setMap(map: NaverMap | null): void;
    getPanes(): {
      overlayLayer: HTMLElement;
    };
  }
}

// Allow importing .geojson files
declare module '*.geojson' {
  export interface Geometry {
    type: 'MultiPolygon'; // The geometry type for MultiPolygon
    coordinates: number[][][][]; // Coordinates for MultiPolygon
  }

  export interface Properties {
    adm_nm: string; // Administrative name, e.g., "대구광역시 북구 구암동"
  }

  export interface SimplifiedGeoJsonFeature {
    type: 'Feature'; // The feature type
    properties: Properties; // Properties of the feature
    geometry: Geometry; // Geometry data of the feature
  }

  export interface SimplifiedGeoJson {
    type: 'FeatureCollection'; // The GeoJSON type
    name?: string; // Optional name for the GeoJSON dataset
    crs?: {
      type: string; // CRS type
      properties: {
        name: string; // CRS name
      };
    };
    features: SimplifiedGeoJsonFeature[]; // Array of features
  }

  const value: SimplifiedGeoJson;
  export default value;
}

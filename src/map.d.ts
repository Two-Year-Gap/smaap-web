/**
 * @types/navermaps 패키지로 TS에 타입 추가 선언
 *
 * 직접 타입 선언하는 방식 X
 */

// export {};

// declare global {
//   interface Window {
//     naver: typeof naver;
//   }

//   namespace naver {
//     namespace maps {
//       class Map {
//         constructor(element: string | HTMLElement, options: MapOptions);
//       }

//       class LatLng {
//         constructor(lat: number, lng: number);
//       }

//       interface MapOptions {
//         center: LatLng;
//         zoom: number;
//       }

//       class Marker {
//         constructor(options: MarkerOptions);
//       }

//       interface MarkerOptions {
//         position: LatLng;
//         map: Map;
//       }
//     }
//   }
// }

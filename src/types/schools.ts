export interface School {
  id: number; // 학교 고유 ID
  name: string; // 학교 이름
  studentCount: number; // 현재 학생 수
  employeeCount: number; // 현재 교직원 수
  type: 'HIGH' | 'MIDDLE' | 'ELEMENTARY'; // 학교 유형
  gender: 'COEDUCATIONAL' | 'BOYS_ONLY' | 'GIRLS_ONLY'; // 성별 구분
  lotNumberAddress: string; // 지번 주소
  lotNumberZipCode: string; // 지번 주소 우편번호
  readNameAddress: string; // 도로명 주소
  readNameZipCode: string; // 도로명 주소 우편번호
  latitude: number; // 위도
  longitude: number; // 경도
  lastYearStudentCount: number; // 작년 학생 수
  lastYearEmployeeCount: number; // 작년 교직원 수
}

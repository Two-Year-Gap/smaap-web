import axios, { AxiosError } from 'axios';
import axiosInstance from '../apis/axiosInstance';

// HealthCheckResponse 타입 정의
export interface HealthCheckResponse {
  status: string; // 서버 상태 ("UP" 또는 "DOWN")
  database: string;
  error: string | null; // 요청 시간
}

// 서버 상태 확인 함수
export const checkServerHealth = async (): Promise<HealthCheckResponse> => {
  try {
    const response = await axiosInstance.get<HealthCheckResponse>('/health');
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError; // error를 AxiosError로 캐스팅
    if (axios.isAxiosError(axiosError)) {
      // HTTP 상태 코드와 메시지를 포함한 에러 던지기
      const status = axiosError.response?.status || 'unknown';
      const message = axiosError.response?.data?.message || axiosError.message;
      console.error(
        `Failed to fetch server health. Status: ${status}, Message: ${message}`,
      );
      throw new Error(
        `Unable to fetch server health. Status: ${status}, Message: ${message}`,
      );
    } else {
      // 네트워크 문제나 기타 일반적인 에러 처리
      console.error('Unexpected error occurred:', error);
      throw new Error(
        'An unexpected error occurred while checking server health.',
      );
    }
  }
};

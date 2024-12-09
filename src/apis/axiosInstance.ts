import axios, { AxiosInstance } from 'axios';

// Axios 인스턴스 생성 및 설정
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
// Axios 디버깅용
/*
axiosInstance.interceptors.request.use((config) => {
  console.log('--- Axios Request ---');
  console.log('Method:', config.method?.toUpperCase()); // 요청 메서드 (GET/POST)
  console.log('URL:', config.url); // 요청 URL
  console.log('Headers:', config.headers); // 요청 헤더
  console.log('Data:', config.data); // 요청 데이터 (POST의 body)
  return config;
});
*/
// 공통 헤더 설정
/*
axiosInstance.defaults.headers.common['Authorization'] =
  `Bearer ${process.env.REACT_APP_API_KEY}`;
*/
export default axiosInstance;

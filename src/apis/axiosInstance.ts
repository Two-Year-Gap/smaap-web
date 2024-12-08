import axios, { AxiosInstance } from 'axios';

// Axios 인스턴스 생성 및 설정
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// 공통 헤더 설정
/*
axiosInstance.defaults.headers.common['Authorization'] =
  `Bearer ${process.env.REACT_APP_API_KEY}`;
*/
export default axiosInstance;

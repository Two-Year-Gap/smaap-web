import axiosInstance from '../apis/axiosInstance';
import { Business } from '../types/business';

// /business API 호출 및 아이콘 매핑 함수
export const fetchBusinesses = async (): Promise<Business[]> => {
  try {
    const response = await axiosInstance.get<Business[]>('/businesses');
    const businesses = response.data.map((business) => ({
      ...business,
      // icon: businessIcons[business.id] || <AllIcon />, // TODO: 동적 SVG 매핑
    }));
    return businesses;
  } catch (error) {
    console.error('Failed to fetch businesses:', error);
    throw new Error('Unable to fetch business list');
  }
};

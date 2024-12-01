import axiosInstance from '../apis/axiosInstance';
import { School } from '../types/schools';

interface FetchSchoolsParams {
  name?: string;
  address?: string;
  type?: 'HIGH' | 'MIDDLE' | 'ELEMENTARY';
  gender?: 'COEDUCATIONAL' | 'BOYS_ONLY' | 'GIRLS_ONLY';
}

export const fetchSchools = async (
  params: FetchSchoolsParams = {},
): Promise<School[]> => {
  try {
    const response = await axiosInstance.get<School[]>('/schools', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching schools:', error);
    throw new Error('Unable to fetch school data');
  }
};

import axiosInstance from 'src/apis/axiosInstance';

export interface WelfareInfraApiParams {
  latitude: number;
  longitude: number;
  range: number;
  type?: 'EMERGENCY_BELL' | 'KEEPER_HOUSE' | 'CCTV';
  size: number;
}

export interface WelfareInfra {
  id: number;
  name: string;
  type: string;
  lotNumberAddress: string;
  readNameAddress: string;
  latitude: number;
  longitude: number;
  locationExplanation: string | null;
}

export const fetchWelfareInfra = async (
  params: WelfareInfraApiParams,
): Promise<WelfareInfra[]> => {
  try {
    const response = await axiosInstance.get('/welfare-infra', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching welfare infra:', error);
    throw error;
  }
};

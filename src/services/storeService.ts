import axiosInstance from 'src/apis/axiosInstance';

export interface StoreApiParams {
  businessId?: number;
  neighborhoodId: number;
  latitude: number;
  longitude: number;
  range: number;
  size?: number;
}

export interface Store {
  id: number | string;
  name: string;
  latitude: number;
  longitude: number;
  lotNumberAddress: string;
  readNameAddress: string;
  neighborhood: {
    id: number;
    name: string;
    district: {
      id: number;
      region: {
        id: number;
        name: string;
      };
      name: string;
    };
  };
}

export const fetchStores = async (params: StoreApiParams): Promise<Store[]> => {
  try {
    const response = await axiosInstance.get('/stores', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stores:', error);
    throw error;
  }
};

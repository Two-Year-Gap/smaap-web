import axiosInstance from '../apis/axiosInstance';

export interface Population {
  homePopulation: number;
  workPopulation: number;
  visitPopulation: number;
}

export const fetchPopulation = async (params: {
  year: number;
  neighborhood_id: number;
}): Promise<Population> => {
  try {
    const response = await axiosInstance.get('/populations', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching population:', error);
    throw error;
  }
};

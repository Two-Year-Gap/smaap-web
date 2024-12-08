import axiosInstance from '../apis/axiosInstance';

export interface District {
  id: number;
  name: string;
  region: {
    id: number;
    name: string;
  };
}

export interface Neighborhood {
  id: number;
  name: string;
  district: {
    id: number;
    name: string;
    region: {
      id: number;
      name: string;
    };
  };
}

// districts API
export const fetchDistricts = async (): Promise<District[]> => {
  try {
    const response = await axiosInstance.get('/regions/1/districts');
    return response.data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

// neighborhoods API
export const fetchNeighborhoods = async (
  districtId: number,
): Promise<Neighborhood[]> => {
  try {
    const response = await axiosInstance.get(
      `/regions/1/districts/${districtId}/neighborhoods`,
    );
    return response.data; // Neighborhood[] 형태
  } catch (error) {
    console.error(
      `Error fetching neighborhoods for district ${districtId}:`,
      error,
    );
    throw error;
  }
};

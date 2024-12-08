import axiosInstance from '../apis/axiosInstance';

export interface NeighborhoodsApiParams {
  type: 'STORE' | 'SALES' | 'FLOATING' | 'RESIDENT';
  count: number;
}

// Response data for /neighborhoods API
export interface Neighborhood {
  id: number;
  name: string;
  count: number;
}

// Response data for /neighborhoods/{id}/recommended-businesses API
export interface RecommendedBusiness {
  id: number;
  name: string;
  percent: number;
}

/**
 * /neighborhoods API
 * @param {Object} params - Query parameters
 * @param {string} params.type - Type of data (STORE, SALES, RESIDENT, FLOATING)
 * @param {number} params.count - Number of results to retrieve
 * @returns {Promise<any[]>} - List of neighborhoods with counts
 */
export const fetchNeighborhoodsData = async (
  params: NeighborhoodsApiParams,
): Promise<Neighborhood[]> => {
  try {
    const response = await axiosInstance.get('/neighborhoods', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching neighborhoods data:', error);
    throw error;
  }
};

/**
 * /neighborhoods/{id}/recommended-businesses API
 * @param {number} id - Neighborhood ID
 * @returns {Promise<any[]>} - List of recommended businesses with percentages
 */
export const fetchRecommendedBusinesses = async (
  id: number,
): Promise<RecommendedBusiness[]> => {
  try {
    const response = await axiosInstance.get(
      `/neighborhoods/${id}/recommended-businesses`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching recommended businesses:', error);
    throw error;
  }
};

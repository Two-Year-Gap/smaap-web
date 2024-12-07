import axiosInstance from 'src/apis/axiosInstance';

export interface SalesApiParams {
  year: number;
  neighborhood_id: number;
  business_id?: number;
}

export interface SalesData {
  salesAmount: number;
  salesCount: number;
}

export const fetchSales = async (
  params: SalesApiParams,
): Promise<SalesData> => {
  try {
    const response = await axiosInstance.get('/sales', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch sales data:', error);
    throw error;
  }
};

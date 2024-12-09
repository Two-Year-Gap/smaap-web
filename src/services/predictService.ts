import axiosInstance from 'src/apis/axiosInstance';

export interface PredictApiParams {
  neighborhood_id: number;
  business_id?: number;
}

export interface PredictResponse {
  population: {
    neighborhood_id: number;
    predicted_population: {
      home: number[];
      visit: number[];
      work: number[];
      total: number[];
    };
  };
  revenue: {
    business_id: number;
    neighborhood_id: number;
    predicted_revenue: number[];
  };
}

export const fetchPrediction = async (
  params: PredictApiParams,
): Promise<PredictResponse> => {
  try {
    const response = await axiosInstance.post('/predict', params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch prediction data:', error);
    throw error;
  }
};

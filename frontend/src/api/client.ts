//src/api/client.ts
import axios from 'axios';

const API_BASE = '/api';

export interface CalculateRequest {
  operation: string;
  a?: number;
  b?: number;
  num?: number;
}

export interface CalculateResponse {
  result?: number;
  error?: string;
}

export const calculate = async (req: CalculateRequest): Promise<CalculateResponse> => {
  try {
    const response = await axios.post(`${API_BASE}/calculate`, req);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return { error: error.response.data.error || 'Unknown error occurred' };
    }
    return { error: 'Network error - could not reach server' };
  }
};

export const healthCheck = async (): Promise<boolean> => {
  try {
    await axios.get(`${API_BASE}/health`);
    return true;
  } catch {
    return false;
  }
};
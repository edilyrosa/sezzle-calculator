import axios from 'axios';
import { calculate, healthCheck } from './client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calculate returns result on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { result: 8 } });
    const result = await calculate({ operation: 'add', a: 5, b: 3 });
    expect(result).toEqual({ result: 8 });
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/calculate', {
      operation: 'add',
      a: 5,
      b: 3,
    });
  });

  test('calculate handles error response', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: 'division by zero' } },
    });
    const result = await calculate({ operation: 'divide', a: 10, b: 0 });
    expect(result).toEqual({ error: 'division by zero' });
  });

  test('healthCheck returns true on success', async () => {
    mockedAxios.get.mockResolvedValueOnce({});
    const ok = await healthCheck();
    expect(ok).toBe(true);
  });

  test('healthCheck returns false on error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
    const ok = await healthCheck();
    expect(ok).toBe(false);
  });
});
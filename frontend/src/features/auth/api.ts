import client from '../../shared/api/client.js';

interface AuthRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export const getErrorMessage = (err: any, fallback: string): string => {
  const data = err?.response?.data;

  if (typeof data === 'string') return data;

  if (data?.errors && typeof data.errors === 'object') {
    const firstError = Object.values(data.errors)[0];
    if (Array.isArray(firstError) && typeof firstError[0] === 'string') {
      return firstError[0];
    }
  }

  return fallback;
};

export const register = async (data: AuthRequest): Promise<string> => {
    const response = await client.post<string>('/auth/register', data);
    return response.data;
}

export const login = async (data: AuthRequest): Promise<string> => {
    const response = await client.post<LoginResponse>('/auth/login', data);
    return response.data.token;
}
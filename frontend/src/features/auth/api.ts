import client from '../../shared/api/client.js';

interface AuthRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export const register = async (data: AuthRequest): Promise<string> => {
    const response = await client.post<string>('/auth/register', data);
    return response.data;
}

export const login = async (data: AuthRequest): Promise<string> => {
    const response = await client.post<LoginResponse>('/auth/login', data);
    return response.data.token;
}
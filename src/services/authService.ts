import { API_BASE_URL } from '../config';

interface LoginResponse {
  id_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone_number?: string;
    avatar_url?: string;
  };
}

interface RegisterResponse {
  uid: string;
  idToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone_number?: string;
    uid?: string;
  };
}

interface ProfileResponse {
  uid: string;
  id: string;
  email: string;
  name: string;
  phone_number?: string;
  picture?: string;
}

async function apiRequest<T>(
  endpoint: string,
  method: string = 'GET',
  body: any = null,
  isFormData: boolean = false,
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    if (isFormData) {
      config.body = body;
    } else {
      config.body = JSON.stringify(body);
    }
  }

  const fullUrl = `${API_BASE_URL}${endpoint}`;

  console.log(`[API REQUEST] ${method} para: ${fullUrl}`);
  console.log('[API REQUEST] Body:', isFormData ? 'FormData (imagem)' : body);
  console.log('[API REQUEST] Headers:', headers);

  try {
    const response = await fetch(fullUrl, config);

    if (!response.ok) {
      let errorData = { message: 'Erro desconhecido na requisição.' };
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          errorData.message = await response.text();
        }
      } catch (e) {
        console.error('Erro ao parsear resposta de erro:', e);
      }
      throw new Error(errorData.message || `Erro na API: ${response.statusText} (${response.status})`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text() as Promise<T>;
  } catch (error: any) {
    console.error('Erro de rede:', error);

    if (error.message.includes('Network request failed')) {
      throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }

    throw new Error(`Problema de conexão: ${error.message}`);
  }
}

export const authService = {
  register: async (email: string, password: string, name: string, phone_number: string): Promise<RegisterResponse> => {
    return apiRequest<RegisterResponse>('/auth/register', 'POST', { email, password, name, phone_number });
  },

  login: async (email: string, password: string): Promise<LoginResponse> => {
    return apiRequest<LoginResponse>('/auth/login', 'POST', { email, password });
  },

  refreshToken: async (refreshToken: string) => {
    return apiRequest('/auth/refresh', 'POST', { refreshToken });
  },

  getProfile: async (idToken: string): Promise<ProfileResponse> => {
    return apiRequest<ProfileResponse>('/profile', 'GET', null, false, idToken);
  },

  updateProfile: async (idToken: string, profileData: { name?: string; email?: string; phone_number?: string; picture?: string; }): Promise<ProfileResponse> => {
    return apiRequest<ProfileResponse>('/profile', 'PUT', profileData, false, idToken);
  },

  selectDefaultAvatar: async (avatarId: number, idToken: string): Promise<ProfileResponse> => {
    const pictureValue = `avatar_${avatarId}`;
    return apiRequest<ProfileResponse>('/profile', 'PUT', { picture: pictureValue }, false, idToken);
  },

  deleteAccount: async (idToken: string): Promise<any> => {
    return apiRequest('/profile/delete-account', 'DELETE', null, false, idToken);
  },
};
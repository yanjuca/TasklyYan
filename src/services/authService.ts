// services/authService.ts
import { API_BASE_URL } from '../config';

// Tipos para as respostas da API
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
  };
}

interface ProfileResponse {
  id: string;
  email: string;
  name: string;
  phone_number?: string;
  avatar_url?: string;
}

interface AvatarUploadResponse {
  success: boolean;
  avatar_url: string;
  message: string;
}

/**
 * Função auxiliar genérica para fazer requisições à API.
 */
async function apiRequest<T>(
  endpoint: string, 
  method: string = 'GET', 
  body: any = null, 
  isFormData: boolean = false,
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {};
  
  // Adiciona token de autenticação se fornecido
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Só adiciona Content-Type se não for FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    if (isFormData) {
      config.body = body; // FormData para upload de imagens
    } else {
      config.body = JSON.stringify(body); // JSON normal
    }
  }

  const fullUrl = `${API_BASE_URL}${endpoint}`;
  
  console.log(`[API REQUEST] ${method} para: ${fullUrl}`);
  console.log('[API REQUEST] Body:', isFormData ? 'FormData (imagem)' : body);

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

  // Nova função para buscar dados do perfil (incluindo avatar)
  getProfile: async (idToken: string): Promise<ProfileResponse> => {
    return apiRequest<ProfileResponse>('/profile', 'GET', null, false, idToken);
  },

  // Nova função para upload de avatar
  uploadAvatar: async (imageUri: string, userId: string, idToken: string): Promise<AvatarUploadResponse> => {
    const formData = new FormData();
    
    // Adiciona a imagem ao FormData
    formData.append('avatar', {
      uri: imageUri,
      type: 'image/jpeg',
      name: `avatar-${userId}.jpg`,
    } as any);
    
    formData.append('userId', userId);

    return apiRequest<AvatarUploadResponse>('/profile/avatar', 'POST', formData, true, idToken);
  },
};
// src/services/authService.ts

import { API_BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Certifique-se de que está importado

// ... (suas interfaces LoginResponse, RegisterResponse, ProfileResponse) ...

// Adicionar RefreshTokenResponse para a função de refresh
interface RefreshTokenResponse {
  id_token: string;
  refresh_token: string;
}

// **IMPORTANTE: AQUI ESTAMOS VOLTANDO COM A LÓGICA DE REFRESH TOKEN NA apiRequest**
// Isso é crucial para que as requisições futuras, e não apenas a de avatar,
// consigam renovar o token automaticamente.
async function apiRequest<T>(
  endpoint: string,
  method: string = 'GET',
  body: any = null,
  isFormData: boolean = false,
  token?: string,
  retryCount: number = 0 // Adicionado para controle de re-tentativa
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

    // Lógica de re-tentativa com refresh token
    if (response.status === 401 && endpoint !== '/auth/refresh' && retryCount === 0) {
      console.log('Requisição original recebeu 401. Tentando refresh token...');
      const currentRefreshToken = await AsyncStorage.getItem('refreshToken');

      if (currentRefreshToken) {
        try {
          const refreshResponse = await authService.refreshToken(currentRefreshToken);
          const newIdToken = refreshResponse.id_token;
          const newRefreshToken = refreshResponse.refresh_token;

          await AsyncStorage.setItem('idToken', newIdToken);
          await AsyncStorage.setItem('refreshToken', newRefreshToken);

          console.log('Token renovado com sucesso. Re-tentando a requisição original.');
          return apiRequest<T>(endpoint, method, body, isFormData, newIdToken, 1);
        } catch (refreshError: any) {
          console.error('Falha ao renovar o token:', refreshError);
          await AsyncStorage.multiRemove(['idToken', 'refreshToken', 'loggedUserEmail', 'loggedUserNome', 'loggedUserNumero', 'loggedUserId']);
          throw new Error('Sua sessão expirou. Por favor, faça login novamente.');
        }
      } else {
        console.warn('Não há refresh token para renovar. Deslogando.');
        await AsyncStorage.multiRemove(['idToken', 'refreshToken', 'loggedUserEmail', 'loggedUserNome', 'loggedUserNumero', 'loggedUserId']);
        throw new Error('Sua sessão expirou. Por favor, faça login novamente.');
      }
    }

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
    console.error('Erro de rede ou API:', error);

    if (error.message.includes('Network request failed')) {
      throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
    if (error.message.includes('Sua sessão expirou.')) {
        throw error;
    }
    throw new Error(`Problema de conexão: ${error.message}`);
  }
}

export const authService = {
  register: async (email: string, password: string, name: string, phone_number: string): Promise<RegisterResponse> => {
    return apiRequest<RegisterResponse>('/auth/register', 'POST', { email, password, name, phone_number });
  },

  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiRequest<LoginResponse>('/auth/login', 'POST', { email, password });
    return response;
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    console.log('[AUTH SERVICE] Chamando /auth/refresh com refreshToken');
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, { // Use fetch direto aqui
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        let errorData = { message: 'Falha ao renovar o token.' };
        try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                errorData = await response.json();
            } else {
                errorData.message = await response.text();
            }
        } catch (e) {
            console.error('Erro ao parsear resposta de erro de refresh:', e);
        }
        throw new Error(errorData.message || `Erro ao renovar token: ${response.statusText} (${response.status})`);
    }
    return response.json();
  },

  getProfile: async (idToken: string): Promise<ProfileResponse> => {
    return apiRequest<ProfileResponse>('/profile', 'GET', null, false, idToken);
  },

  // *** MUDANÇA AQUI: Adicionar name e phone_number ***
  updateProfile: async (idToken: string, profileData: { name: string; email?: string; phone_number: string; picture?: string; }): Promise<ProfileResponse> => {
    // Certifique-se de que name e phone_number são sempre passados aqui
    return apiRequest<ProfileResponse>('/profile', 'PUT', profileData, false, idToken);
  },

  // *** MUDANÇA AQUI: Modificar para aceitar name e phone_number ***
  selectDefaultAvatar: async (avatarId: number, idToken: string, name: string, phone_number: string): Promise<ProfileResponse> => {
    const pictureValue = `avatar_${avatarId}`;
    // Agora enviamos name e phone_number junto com picture
    return apiRequest<ProfileResponse>('/profile', 'PUT', { picture: pictureValue, name: name, phone_number: phone_number }, false, idToken);
  },

  deleteAccount: async (idToken: string): Promise<any> => {
    return apiRequest('/profile/delete-account', 'DELETE', null, false, idToken);
  },
};
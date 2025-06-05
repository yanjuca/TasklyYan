// src/services/authService.js

// Precisamos importar a URL base da API que definimos no arquivo de configuração.
// O caminho './../config' significa:
//  '.'         => "daqui (da pasta services)"
//  '..'        => "suba uma pasta (para src)"
//  '/config'   => "entre na pasta config"
import { API_BASE_URL } from '../config';

/**
 * Função auxiliar genérica para fazer requisições à API.
 * Isso evita repetir o mesmo código de fetch e tratamento de erros.
 * @param {string} endpoint - O caminho específico da API (ex: '/auth/login').
 * @param {string} method - O método HTTP (GET, POST, PUT, DELETE).
 * @param {object | null} body - O corpo da requisição, se houver (para POST, PUT).
 * @returns {Promise<any>} A resposta JSON da API ou um erro.
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json', // Informa à API que estamos enviando JSON
  };

  const config = {
    method, // Método HTTP (GET, POST, etc.)
    headers, // Cabeçalhos da requisição
  };

  if (body) {
    // Se houver um corpo, converte o objeto JavaScript para uma string JSON
    config.body = JSON.stringify(body);
  }

  const fullUrl = `${API_BASE_URL}${endpoint}`;
  console.log(`[API REQUEST] Fazendo requisição ${method} para: ${fullUrl}`); // Log da URL completa
  console.log('[API REQUEST] Corpo (body) da requisição:', body); // Log do corpo original
  console.log('[API REQUEST] Headers da requisição:', headers); // Log dos headers
  console.log('[API REQUEST] Configuração completa do fetch:', config); // Log da config completa

  console.log(`Fazendo requisição ${method} para: <span class="math-inline">\{API\_BASE\_URL\}</span>{endpoint}`); // Ajuda na depuração

  try {
    // Realiza a requisição HTTP
    const response = await fetch(`<span class="math-inline">\{API\_BASE\_URL\}</span>{endpoint}`, config);

    if (!response.ok) {
      // Se a resposta não for bem-sucedida (ex: status 400, 401, 500),
      // tenta ler a mensagem de erro que o backend enviou.
      let errorData = { message: 'Erro desconhecido na requisição.' };
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          // Se a resposta for JSON, tenta parsear o corpo
          errorData = await response.json();
        } else {
          // Caso contrário, lê como texto
          errorData.message = await response.text();
        }
      } catch (e) {
        console.error('Erro ao tentar parsear resposta de erro:', e);
        // Mantém a mensagem de erro genérica se não conseguir parsear
      }
      // Lança um erro para ser capturado no .catch() de quem chamou a função
      throw new Error(errorData.message || `Erro na API: <span class="math-inline">\{response\.statusText\} \(</span>{response.status})`);
    }

    // Se a resposta for bem-sucedida, verifica o tipo de conteúdo.
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      // Se for JSON, retorna o objeto JSON parseado
      return response.json();
    }
    // Se não for JSON (ex: resposta vazia ou só texto), retorna o texto ou uma string vazia
    return response.text();
  } catch (error) {
    // Captura erros de rede (ex: servidor offline, sem internet)
    console.error('Erro de rede ou na requisição:', error);
    throw new Error(`Problema de conexão: ${error.message}`);
  }
}

// --- Funções Específicas de Autenticação ---
// Exportamos essas funções para que outros arquivos possam usá-las.
export const authService = {
  /**
   * Registra um novo usuário na API.
   * @param {string} email
   * @param {string} password
   * @param {string} name
   * @param {string} phone_number
   * @returns {Promise<{uid: string, idToken: string}>} Retorna o uid e o idToken do usuário registrado.
   */
  register: async (email, password, name, phone_number) => {
    return apiRequest('/auth/register', 'POST', { email, password, name, phone_number });
  },

  /**
   * Realiza o login de um usuário existente na API.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{id_token: string, refresh_token: string}>} Retorna os tokens de autenticação.
   */
  login: async (email, password) => {
    return apiRequest('/auth/login', 'POST', { email, password });
  },

  /**
   * Renova o token de autenticação usando o refresh token.
   * @param {string} refreshToken - O token de renovação.
   * @returns {Promise<{idToken: string, refreshToken: string, expiresIn: string}>} Retorna novos tokens.
   */
  refreshToken: async (refreshToken) => {
    return apiRequest('/auth/refresh', 'POST', { refreshToken });
  },
};
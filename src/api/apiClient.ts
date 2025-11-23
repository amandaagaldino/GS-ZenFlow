import axios from "axios";
import { API_CONFIG } from "@/src/config/api";

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.DEFAULT_HEADERS,
  timeout: API_CONFIG.TIMEOUT,
});

// Interceptor para adicionar tratamento de erros
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro com resposta do servidor
      const message = error.response.data?.detail || error.response.data?.message || "Erro ao processar requisição";
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Erro de rede
      return Promise.reject(new Error("Erro de conexão. Verifique sua internet."));
    } else {
      // Outro erro
      return Promise.reject(error);
    }
  }
);

export { apiClient };


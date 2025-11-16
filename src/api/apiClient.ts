import axios from "axios";

// TODO: Configurar URL base da API quando disponível
const BASE_URL = "https://api.exemplo.com/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiClient };


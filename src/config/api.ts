/**
 * Configuração da API
 * 
 * IMPORTANTE: Para dispositivos físicos ou emuladores Android/iOS,
 * substitua "localhost" pelo IP da sua máquina na rede local.
 * 
 * Exemplo: "http://192.168.1.100:5281/api"
 * 
 * Para encontrar seu IP:
 * - Windows: ipconfig
 * - Mac/Linux: ifconfig ou ip addr
 */

export const API_CONFIG = {
  // URL base da API
  BASE_URL: __DEV__ 
    ? "http://localhost:5281/api"  // Desenvolvimento local
    : "https://api.zenflow.com/api", // Produção
  
  // Timeout das requisições (em milissegundos)
  TIMEOUT: 10000,
  
  // Headers padrão
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
};

// Para facilitar a mudança da URL em diferentes ambientes
// Descomente e ajuste conforme necessário:

// Desenvolvimento local (web/emulador)
// export const API_CONFIG = {
//   BASE_URL: "http://localhost:5281/api",
//   TIMEOUT: 10000,
//   DEFAULT_HEADERS: {
//     "Content-Type": "application/json",
//   },
// };

// Dispositivo físico (substitua pelo IP da sua máquina)
// export const API_CONFIG = {
//   BASE_URL: "http://192.168.1.100:5281/api",
//   TIMEOUT: 10000,
//   DEFAULT_HEADERS: {
//     "Content-Type": "application/json",
//   },
// };

// Produção
// export const API_CONFIG = {
//   BASE_URL: "https://api.zenflow.com/api",
//   TIMEOUT: 10000,
//   DEFAULT_HEADERS: {
//     "Content-Type": "application/json",
//   },
// };


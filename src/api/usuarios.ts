import { Usuario, LoginRequest, CreateUsuarioRequest } from "@/src/types/usuario";
import { apiClient } from "./apiClient";

/**
 * Realiza login de usuário
 * @param credentials - { email: string, senha: string }
 * @returns Usuário autenticado
 */
export async function login(credentials: LoginRequest): Promise<Usuario> {
  const response = await apiClient.post<Usuario>("/Usuario/login", credentials);
  return response.data;
}

/**
 * Cria um novo usuário
 * @param data - Dados do usuário
 * @returns Usuário criado
 */
export async function createUsuario(data: CreateUsuarioRequest): Promise<Usuario> {
  const response = await apiClient.post<Usuario>("/Usuario", data);
  return response.data;
}

/**
 * Busca usuário por ID
 * @param id - ID do usuário
 * @returns Usuário encontrado
 */
export async function getUsuarioById(id: number): Promise<Usuario> {
  const response = await apiClient.get<Usuario>(`/Usuario/${id}`);
  return response.data;
}

/**
 * Lista todos os usuários ativos
 * @returns Lista de usuários
 */
export async function getAllUsuarios(): Promise<Usuario[]> {
  const response = await apiClient.get<Usuario[]>("/Usuario");
  return response.data;
}


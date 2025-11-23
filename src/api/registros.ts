import { Registro, NewRegistro } from "@/src/types/registro";
import { apiClient } from "./apiClient";

/**
 * Cria um novo registro de estresse para um usuário
 * @param usuarioId - ID do usuário
 * @param data - { nivelEstresse: number, observacoes?: string }
 * @returns Resposta da API
 */
export async function createRegistro(usuarioId: number, data: NewRegistro): Promise<Registro> {
  const response = await apiClient.post<Registro>(`/Registro/usuario/${usuarioId}`, data);
  return response.data;
}

/**
 * Busca todos os registros ativos
 * @returns Lista de registros
 */
export async function getAllRegistros(): Promise<Registro[]> {
  const response = await apiClient.get<Registro[]>("/Registro");
  return response.data;
}

/**
 * Busca registros de um usuário específico
 * @param usuarioId - ID do usuário
 * @returns Lista de registros do usuário
 */
export async function getRegistrosByUsuario(usuarioId: number): Promise<Registro[]> {
  const response = await apiClient.get<Registro[]>(`/Registro/usuario/${usuarioId}`);
  return response.data;
}

/**
 * Busca um registro por ID
 * @param id - ID do registro
 * @returns Registro encontrado
 */
export async function getRegistroById(id: number): Promise<Registro> {
  const response = await apiClient.get<Registro>(`/Registro/${id}`);
  return response.data;
}

/**
 * Deleta um registro (remoção lógica)
 * @param id - ID do registro
 * @param usuarioId - ID do usuário (para validação de permissão)
 */
export async function deleteRegistro(id: number, usuarioId: number): Promise<void> {
  await apiClient.delete(`/Registro/${id}/usuario/${usuarioId}`);
}

/**
 * Busca estatísticas para a tela do gestor
 * Retorna todos os registros para cálculos agregados
 * @returns Lista de registros para cálculos
 */
export async function getEstatisticas(): Promise<Registro[]> {
  const response = await apiClient.get<Registro[]>("/Registro");
  return response.data;
}

/**
 * Atualiza um registro de estresse existente
 * @param id - ID do registro
 * @param usuarioId - ID do usuário (para validação de permissão)
 * @param data - { nivelEstresse: number, observacoes?: string }
 * @returns Registro atualizado
 */
export async function updateRegistro(id: number, usuarioId: number, data: NewRegistro): Promise<Registro> {
  const response = await apiClient.put<Registro>(`/Registro/${id}/usuario/${usuarioId}`, data);
  return response.data;
}


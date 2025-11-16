import { Registro, NewRegistro } from "@/src/types/registro";
import { apiClient } from "./apiClient";

/**
 * Cria um novo registro de estresse
 * @param data - { nivelEstresse: number, observacoes?: string }
 * @returns Resposta da API
 */
export async function createRegistro(data: NewRegistro) {
  const response = await apiClient.post<Registro>("/registros", data);
  return response.data;
}

/**
 * Busca todos os registros
 * @returns Lista de registros
 */
export async function getRegistros() {
  const response = await apiClient.get<Registro[]>("/registros");
  return response.data;
}

/**
 * Atualiza um registro existente
 * @param id - ID do registro
 * @param data - { nivelEstresse: number, observacoes?: string }
 * @returns Resposta da API
 */
export async function updateRegistro(id: string, data: NewRegistro) {
  const response = await apiClient.put<Registro>(`/registros/${id}`, data);
  return response.data;
}

/**
 * Deleta um registro
 * @param id - ID do registro
 */
export async function deleteRegistro(id: string) {
  await apiClient.delete(`/registros/${id}`);
}

/**
 * Busca estatísticas para a tela do gestor
 * @returns Lista de registros para cálculos
 */
export async function getEstatisticas() {
  const response = await apiClient.get<Registro[]>("/registros");
  return response.data;
}


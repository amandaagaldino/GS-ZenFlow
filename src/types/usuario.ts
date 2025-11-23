// Tipos correspondentes ao backend .NET
export interface Usuario {
  id: number;
  nomeCompleto: string;
  email: string;
  dataNascimento: string; // ISO timestamp
  cpf: string;
  isGestor: boolean;
  dataCriacao: string; // ISO timestamp
  dataAtualizacao?: string; // ISO timestamp
  ativo: boolean;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface CreateUsuarioRequest {
  nomeCompleto: string;
  email: string;
  senha: string;
  dataNascimento: string; // ISO timestamp (YYYY-MM-DD)
  cpf: string;
  isGestor?: boolean;
}


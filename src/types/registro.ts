// Tipos correspondentes ao backend .NET
export interface Registro {
  id: number;
  usuarioId: number;
  usuarioNome: string;
  nivelEstresse: number; // 1-5
  observacoes?: string;
  data: string; // ISO timestamp
}

export interface NewRegistro {
  nivelEstresse: number;
  observacoes?: string;
}


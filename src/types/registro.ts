export interface Registro {
  id: string;
  nivelEstresse: number; // 1-5
  observacoes?: string;
  data: string; // ISO timestamp
}

export interface NewRegistro {
  nivelEstresse: number;
  observacoes?: string;
}


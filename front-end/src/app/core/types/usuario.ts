export interface Usuario {
  id?: number,
  nome?: string,
  email: string,
  senha: string,
  matricula?: string,
  semestre?: string,
  status: string,
  token?: string,
  perfil_id: number,
  perfil: Perfil
}

export interface Perfil {
  id: number;
  nome: string;
  documentId?: number;
  permissoes?: Permissoes[];
}

export interface Permissoes {
  acesso_total?: boolean;
  icon: string;
  options?: Option[];
  modulo?: string;
  acoes?: string[];
}

export interface Option {
  icon: string;
  title: string;
}

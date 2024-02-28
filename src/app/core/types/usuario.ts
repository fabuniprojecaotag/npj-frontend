export interface Usuario {
  documentId?: string;
  id?: number,
  username: string, // nome
  password: string, // senha
  email: string,
  matricula?: string,
  semestre?: string,
  accountNonLocked: boolean, // status
  perfil: Perfil
}

export interface Perfil {
  id: number;
  nome: string;
  documentId: string;
  permissoes: Permissoes[];
}

export interface Permissoes {
  acesso_total?: boolean;
  icon?: string;
  options?: Option[];
  modulo?: string;
  acoes?: string[];
}

export interface Option {
  icon: string;
  title: string;
  route: string;
}

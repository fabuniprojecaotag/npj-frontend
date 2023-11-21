export interface Usuario {
  id?: number,
  nome?: string,
  email_academico: string,
  senha: string,
  matricula?: number,
  status?: string,
  tipo?: string,
  token?: string,
  perfil_id?: number
}

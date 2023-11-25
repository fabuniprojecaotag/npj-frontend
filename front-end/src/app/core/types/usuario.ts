export interface Usuario {
  id?: number,
  nome?: string,
  email_academico: string,
  senha: string,
  matricula?: number,
  status?: string,
  token?: string, // token do jwt
  perfil_id: number // ex: 1 = administrador, 2 = coord, 3 = secre, 4 = prof, 5 = estag
}

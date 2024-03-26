export interface Usuario {
  nome: string,
  senha: string,
  email: string,
  status: boolean,
  role: string,
  unidadeInstitucional?: string
  // opcionais/estagiário:
  matricula?: string,
  semestre?: string,
  supervisor?: string
}


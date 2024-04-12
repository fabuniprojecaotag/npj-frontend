export interface Usuario {
  "@type": string,
  id: string,
  email: string,
  nome: string,
  cpf?: string,
  unidadeInstitucional?: string,
  senha: string,
  status: boolean,
  role: string,
  // opcionais/estagiário:
  matricula?: string,
  semestre?: string,
  supervisor?: string
}


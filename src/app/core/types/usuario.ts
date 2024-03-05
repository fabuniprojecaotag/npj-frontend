export interface Usuario {
  documentId?: string;
  id: string,
  nome: string,
  senha: string,
  email: string,
  status: boolean,
  role: string,
  // opcionais:
  matricula?: string,
  semestre?: string,
  unidadeInstitucional?: string
}

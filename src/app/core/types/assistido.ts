export interface Assistido {
  "@type"?: string,
  documentId?: string,
  nome: string,
  email?: string,
  cpf?: string,
  rg?: string,
  naturalidade?: string,
  nacionalidade?: string,
  dataNascimento?: string,
  estadoCivil?: string,
  telefone?: string,
  endereco: Endereco,
  escolaridade?: string,
  filiacao: Filiacao,
  profissao?: string,
  remuneracao?: string,
  cidadeComercial?: string,
  enderecoComercial?: string,
  numDependentes?: string,
}

export interface Filiacao {
  pai: string,
  mae: string,
}

export interface Endereco {
  logradouro?: string,
  bairro?: string,
  numero?: string,
  complemento?: string,
  cep?: string,
  cidade?: string
}

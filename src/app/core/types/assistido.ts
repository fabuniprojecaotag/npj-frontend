export interface Assistido {
  "@type"?: string,
  nome: string,
  email?: string,
  cpf?: string,
  rg?: string,
  naturalidade?: string,
  nacionalidade?: string,
  dataNascimento?: string,
  estadoCivil?: string,
  telefone?: string,
  endereco: TipoEndereco,
  escolaridade?: string,
  filiacao: Filiacao,
  profissao?: string,
  remuneracao?: string,
  cidadeComercial?: string,
  enderecoComercial?: string,
  dependentes?: string,
}

export interface Filiacao {
  pai: string,
  mae: string,
}

export interface TipoEndereco {
  residencial: Endereco,
  comercial?: Endereco,
}

export interface Endereco {
  logradouro?: string,
  bairro?: string,
  numero?: string,
  complemento?: string,
  cep?: string,
  cidade?: string
}

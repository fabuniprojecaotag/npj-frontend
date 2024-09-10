import { Endereco } from './endereco';

export interface Assistido {
  '@type'?: string,
  nome: string,
  email?: string,
  cpf: string,
  rg: string,
  nacionalidade?: string,
  estadoCivil?: string,
  telefone?: string,
  endereco: TipoEndereco,
  escolaridade?: string,
  filiacao: Filiacao,
  profissao?: string,
  remuneracao?: string,
}

export interface AssistidoCivil extends Assistido {
  dataNascimento?: string,
  naturalidade?: string,
  dependentes?: number,
}

export interface AssistidoTrabalhista extends Assistido {
  ctps: Ctps,
  pis: string,
  empregadoAtualmente: boolean,
}

export interface AssistidoFull extends AssistidoCivil, AssistidoTrabalhista { }

export interface Filiacao {
  pai?: string,
  mae: string,
}

export interface TipoEndereco {
  residencial: Endereco,
  comercial?: Endereco,
}

export interface Ctps {
  numero?: string,
  serie?: string,
  uf?: string,
}


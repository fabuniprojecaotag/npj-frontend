import { Endereco } from "./endereco";
import { UsuarioCriador } from "./usuario";

export interface Atendimento {
  "@type": string,
  id: string,
  status: string,
  area: string,
  instante?: string,
  ficha: FichaCivil | FichaTrabalhista,
  prazoEntregaDocumentos?: string,
  historico?: EntradaHistorico,
  envolvidos?: Envolvido
}

export interface Ficha {
  "@type": string,
  assinatura: string,
  dadosSensiveis: Boolean,
  testemunhas?: Testemunha[],
}

export interface FichaCivil extends Ficha {
  parteContraria: ParteContraria;
  medidaJudicial: string;
}

export interface FichaTrabalhista extends Ficha {
  //  Reclamado reclamado;
  //    RelacaoEmpregaticia relacaoEmpregaticia;
  //    DocumentosDepositadosNpj documentosDepositadosNpj;
    outrasInformacoes?: string;
}

export interface ParteContraria {
  nome: string,
  qualificacao: string,
  rg?: string,
  cpf?: string,
  email?: string,
  endereco?: Endereco,
  telefone?: string,
}

export interface Testemunha {
  nome: string,
  qualificacao: string,
  endereco: Endereco,
}
export interface Envolvido {
  estagiario: tipoEnvolvido,
  professor: tipoEnvolvido,
  secretaria: tipoEnvolvido,
  assistido: tipoEnvolvido,
}
export interface tipoEnvolvido {
  id: string,
  nome: string,
}

export interface EntradaHistorico {
  id?: string,
  titulo: '',
  descricao: string,
  instante?: string,
  criadoPor: UsuarioCriador,
}

/* Interaface do Steppers de atendimentos para ser traduzida para atendimento */

export interface AtendimentoStepper {
  primeiroGrupo: {
    estagiario: tipoEnvolvido;
    professor: tipoEnvolvido;
    secretaria: tipoEnvolvido;
    instante?: Date;
    area: string;
  };
  segundoGrupo: {
    assistido: tipoEnvolvido;
  };
  terceiroGrupo: {
    nome: string;
    qualificacao: string;
    rg?: string;
    cpf?: string;
    telefone?: string;
    email?: string;
    logradouro?: string,
    bairro?: string,
    numero?: string,
    complemento?: string,
    cep?: string,
    cidade?: string
    informacoesComplementares?: string;
  };
  quartoGrupo: {
    testemunhas: Testemunha[];
  };
  quintoGrupo: {
    historico: string;
    medidaJuridica: string;
    status: string;
    arquivos: string;
    dadosSensiveis: boolean;
  };
}

// TODO: interface do stepper trabalhista


export interface Atendimento {
  "@type": string,
  id: string,
  status: string,
  area: string,
  instante?: string,
  ficha: Ficha | FichaCivil,
  prazoEntregaDocumentos: string,
  historico?: string,
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

export interface ParteContraria {
  nome: string,
  qualificacao: string,
  rg?: string,
  cpf?: string,
  email?: string,
  endereco?: string,
  telefone?: string,
}

export interface Testemunha {
  nome: string,
  qualificacao: string,
  endereco: string,
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

/* Interaface do Stepper Civil para ser traduzida para atendimento */

export interface AtendimentoStepper {
  primeiroGrupo: {
    estagiario: string;
    professor: string;
    instante?: Date;
    area: string;
  };
  segundoGrupo: {
    assistido: string;
  };
  terceiroGrupo: {
    nome: string;
    qualificacao: string;
    rg?: string;
    cpf?: string;
    telefone?: string;
    email?: string;
    endereco?: string;
    informacoesComplementares?: string;
  };
  quartoGrupo: {
    nomeTestemunha1: string;
    qualificacaoTestemunha1: string;
    enderecoTestemunha1: string;
    nomeTestemunha2: string;
    qualificacaoTestemunha2: string;
    enderecoTestemunha2: string;
  };
  quintoGrupo: {
    historico: string;
    medidaJuridica: string;
    status: string;
    arquivos: string;
    dadosSensiveis: boolean;
  };
}


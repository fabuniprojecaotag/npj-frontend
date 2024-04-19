export interface Atendimento {
  "@type": string,
  id: String,
  status: String,
  area: String,
  instante: String,
  ficha: Ficha | FichaCivil,
  prazoEntregaDocumentos: String,
  historico?: String,
  envolvidos?: Envolvido[]
}

export interface Ficha {
  assinatura: String,
  dadosSensiveis: Boolean,
  testemunhas?: Testemunha[],
}

export interface FichaCivil extends Ficha {
  parteContraria: ParteContraria;
  medidaJudicial: string;
}

export interface ParteContraria {
  nome: String,
  qualificacao: String,
  rg?: String,
  cpf?: String,
  email?: String,
  endereco?: String,
  telefone?: String,
}

export interface Testemunha {
  nome: String,
  qualificacao: String,
  endereco: string,
}
export interface Envolvido {
  id: String,
  nome: String,
}

/* Interaface do Stepper Civil para ser traduzida para atendimento */

export interface AtendimentoStepper {
  primeiroGrupo: {
    estagiario: string;
    professor: string;
    instante: Date;
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


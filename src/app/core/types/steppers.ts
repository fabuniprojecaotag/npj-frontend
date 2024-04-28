import { EntradaHistorico, Reclamado, Testemunha, tipoEnvolvido } from "./atendimento";

export interface StepperCivil {
  primeiroGrupo: PrimeiroGrupo,
  segundoGrupo: SegundoGrupo,
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
    historico: EntradaHistorico[];
    medidaJudicial: string;
    status: string;
    arquivos: string;
    dadosSensiveis: boolean;
  };
}

export interface StepperTrabalhista {
  primeiroGrupo: PrimeiroGrupo,
  segundoGrupo: SegundoGrupo,
  terceiroGrupo: Reclamado
  quintoGrupo: {
    historico: EntradaHistorico[];
    status: string;
    arquivos: string;
    dadosSensiveis: boolean;
  }
}

export interface PrimeiroGrupo {
  estagiario: tipoEnvolvido;
  professor: tipoEnvolvido;
  secretaria: tipoEnvolvido;
  instante?: Date;
  area: string;
}

export interface SegundoGrupo {
  assistido: tipoEnvolvido;
}

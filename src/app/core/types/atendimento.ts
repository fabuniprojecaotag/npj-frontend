export interface Atendimento {
  id: String,
  status: String,
  area: String,
  instante: String,
  ficha: Ficha,
  prazoEntregaDocumentos: String,
  historico?: String,
  envolvidos?: Envolvido[]
}
export interface Ficha {
  assinatura: String,
  dadosSensiveis: Boolean,
  testemunhas?: Testemunha[],
}
export interface Testemunha {
  nome: String,
  qualificacao: String,
  endereco: String,
}
export interface Envolvido {
  id: String,
  nome: String,
}

export interface AtendimentoStepper {
  primeiroGrupo: {
    estagiario: string;
    instante: string;
    area: string;
  };
  segundoGrupo: {
    assistido: string;
  };
  terceiroGrupo: {
    nomeParteContraria: string;
    qualificacaoParteContraria: string;
    rgParteContraria?: string;
    cpfParteContraria?: string;
    telefoneParteContraria?: string;
    emailParteContraria?: string;
    enderecoParteContraria?: string;
    informacoesComplementares?: string;
  };
  quartoGrupo?: {
    nomeTestemunha1?: string;
    qualificacaoTestemunha1?: string;
    enderecoTestemunha1?: string;
    nomeTestemunha2?: string;
    qualificacaoTestemunha2?: string;
    enderecoTestemunha2?: string;
  };
  quintoGrupo: {
    historico?: string;
    medidaJuridica: string;
    status: string;
    arquivos?: File | null;
  };
}


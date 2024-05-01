import { Endereco } from "./endereco";
import { UsuarioCriador } from "./usuario";

export interface Atendimento {
  "@type": string,
  id?: string,
  status: string,
  area: string,
  instante?: string,
  ficha: FichaCivil | FichaTrabalhista,
  prazoEntregaDocumentos?: string,
  historico?: EntradaHistorico[],
  envolvidos: Envolvido
}

export interface Ficha {
  "@type": string,
  assinatura: File | string,
  dadosSensiveis: Boolean,
  testemunhas?: Testemunha[],
}

export interface FichaCivil extends Ficha {
  parteContraria: ParteContraria,
  medidaJudicial: string,
}

export interface FichaTrabalhista extends Ficha {
  reclamado: Reclamado,
  relacaoEmpregaticia?: RelacaoEmpregaticia,
  documentosDepositadosNpj?: DocumentosDepositadosNpj,
  outrasInformacoes?: string,
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
  titulo: string,
  descricao: string,
  instante?: string,
  criadoPor: UsuarioCriador,
}

export interface Reclamado {
  nome: string,
  tipoPessoa: string,
  numCadastro: string,
  endereco: Endereco,
}

export interface RelacaoEmpregaticia {
  dataAdmissao?: string,
  dataSaida?: string,
  funcaoExercida?: string,
  valorSalarioCtps?: number,
  salarioAnotadoCtps?: boolean,
  valorUltimaRemuneracao?: number,
  ctpsAssinadaCerto?: boolean,
  dispensa?: string,
  jornadaTrabalho?: string,
  tempoAlmoco?: string,
  faziaHorasExtras?: boolean,
  horarioHorasExtras?: string,
  trabalhavaDomingosFeriados?: string,
  recebiaGratificacoes?: boolean,
  cumpriuAvisoPrevio?: boolean,
  temFeriasVencidasGozar?: boolean,
  recebeu13SalarioAnoAnterior?: boolean,
  fgtsDepositado?: boolean,
  recebeuGuiasSaqueFgts?: boolean,
  recebeuFormSeguroDesemprego?: boolean,
  inssRecolhido?: boolean,
  pagaAlgumaVerba?: string,
  saldoSalario?: number,
  avisoPrevioIndenizado?: string,
  _13SalarioProporcional?: string,
  feriasVencidas?: string,
  feriasProporcionais?: string,
  umTercoConstitucionalFerias?: number,
  comissoes?: string,
  outrasInformacoes?: string,
}

export interface DocumentosDepositadosNpj {
  procuracao: boolean,
  declaracaoPobreza: boolean,
  ctps: boolean,
  identidade: boolean,
  cpf: boolean,
  pis: boolean,
  contrachequeUltimos3Meses: boolean,
  extratoAnaliticoContaFgts: boolean,
  trct: boolean,
  comprovanteRecAntecip13: boolean,
  acordoColetivoTrabalho: boolean,
  outrosDocumentos: string;
}

export interface Processo {
  atendimentoId: string,
  assistidoId: string, // CPF
  numero?: string, // Id do Processo
  nome: string,
  dataDistribuicao: string,
  vara: string,
  forum: string,
  status: string
}

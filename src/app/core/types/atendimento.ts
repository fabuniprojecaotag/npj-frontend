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
export interface Ficha{
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
  
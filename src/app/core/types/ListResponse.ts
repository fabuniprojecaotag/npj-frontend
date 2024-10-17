export interface ListResponse<T>{
  list: T[],
  lastDoc: object,
  pageSize: number;
}
// Nova interface
// Essa interface é generica, no qual, possibilita trabalhar com vários tipos.
// Eu criei exclusivamente para ser usada nos métodos listar atendimento e listar processos.

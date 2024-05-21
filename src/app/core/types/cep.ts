import { Endereco } from './endereco';

export interface CepDados extends Endereco {
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string,
  localidade: string,
}

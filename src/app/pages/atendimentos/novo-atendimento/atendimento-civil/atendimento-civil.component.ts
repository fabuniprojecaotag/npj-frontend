import { Component } from '@angular/core';
import { AtendimentosService } from 'src/app/core/services/atendimentos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import {
  Atendimento,
  AtendimentoStepper,
} from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-atendimento-civil',
  templateUrl: './atendimento-civil.component.html',
  styleUrls: ['./atendimento-civil.component.scss'],
})
export class AtendimentoCivilComponent {
  tituloPagina = 'Atendimento Civil';
  tipoAtendimento = 'Civil';

  constructor(
    private formAtendimentoService: FormsService,
    private atendimentoService: AtendimentosService
  ) {}

  cadastrar() {
    const formAtendimentoCivil = this.formAtendimentoService.getForm();

    if (formAtendimentoCivil?.valid) {
      const novoAtendimentoCivil =
        formAtendimentoCivil.getRawValue() as AtendimentoStepper;
      const novoAtendimentoFormatado: Atendimento = {
        '@type': this.tipoAtendimento,
        id: '',
        area: novoAtendimentoCivil.primeiroGrupo.area,
        instante: novoAtendimentoCivil.primeiroGrupo.instante.toISOString(),
        ficha: {
          assinatura: novoAtendimentoCivil.quintoGrupo.arquivos,
          dadosSensiveis: novoAtendimentoCivil.quintoGrupo.dadosSensiveis,
          testemunhas: [
            {
              nome: novoAtendimentoCivil.quartoGrupo.nomeTestemunha1,
              qualificacao:
                novoAtendimentoCivil.quartoGrupo.qualificacaoTestemunha1,
              endereco: novoAtendimentoCivil.quartoGrupo.enderecoTestemunha1,
            },
            {
              nome: novoAtendimentoCivil.quartoGrupo.nomeTestemunha2,
              qualificacao:
                novoAtendimentoCivil.quartoGrupo.qualificacaoTestemunha2,
              endereco: novoAtendimentoCivil.quartoGrupo.enderecoTestemunha2,
            },
          ],
          parteContraria: {
            nome: novoAtendimentoCivil.terceiroGrupo.nome,
            qualificacao: novoAtendimentoCivil.terceiroGrupo.qualificacao,
            rg: novoAtendimentoCivil.terceiroGrupo.rg,
            cpf: novoAtendimentoCivil.terceiroGrupo.cpf,
            email: novoAtendimentoCivil.terceiroGrupo.email,
            endereco: novoAtendimentoCivil.terceiroGrupo.endereco,
            telefone: novoAtendimentoCivil.terceiroGrupo.telefone,
          },
          medidaJudicial: novoAtendimentoCivil.quintoGrupo.medidaJuridica,
        },
        prazoEntregaDocumentos: '',
        status: novoAtendimentoCivil.primeiroGrupo.area,
        envolvidos: [
          {
            id: '',
            nome: novoAtendimentoCivil.segundoGrupo.assistido,
          },
          {
            id: '',
            nome: novoAtendimentoCivil.primeiroGrupo.estagiario,
          },
          {
            id: '',
            nome: novoAtendimentoCivil.primeiroGrupo.professor,
          },
        ],
      };

      this.atendimentoService
        .cadastrarAtendimento(novoAtendimentoFormatado)
        .subscribe({
          next: () => {
            alert('Cadastro realizado!');
          },
          error: (err) => {
            alert('Erro ao cadastrar atendimento!');
          },
        });
    }
  }
}

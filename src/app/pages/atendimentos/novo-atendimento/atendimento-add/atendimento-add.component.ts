import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtendimentosService } from 'src/app/core/services/atendimentos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Atendimento, AtendimentoStepper } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-atendimento-add',
  templateUrl: './atendimento-add.component.html',
  styleUrls: ['./atendimento-add.component.scss'],
})
export class AtendimentoAddComponent implements OnInit {
  tituloPagina = 'Atendimento - ';
  tipoAtendimento!: string;
  tipoFicha!: string;

  constructor(
    private formAtendimentoService: FormsService,
    private atendimentoService: AtendimentosService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tipoAtendimento = this.route.snapshot.paramMap.get('area') as string;
    this.tituloPagina += this.tipoAtendimento;

    if (this.tipoAtendimento.toLowerCase() !== 'trabalhista') {
      this.tipoFicha = 'Civil';
    } else {
      this.tipoFicha = 'Trabalhista';
    }
  }

  cadastrarCivil() {
    const formAtendimentoCivil = this.formAtendimentoService.getForm();

    if (formAtendimentoCivil?.valid) {
      const novoAtendimentoCivil =
        formAtendimentoCivil.getRawValue() as AtendimentoStepper;

      const novoAtendimentoFormatado: Atendimento = {
        '@type': this.tipoFicha,
        id: '',
        area: novoAtendimentoCivil.primeiroGrupo.area,
        instante: undefined,
        ficha: {
          '@type': this.tipoFicha,
          assinatura: novoAtendimentoCivil.quintoGrupo.arquivos,
          dadosSensiveis: novoAtendimentoCivil.quintoGrupo.dadosSensiveis,
          testemunhas: [
            {
              nome: novoAtendimentoCivil.quartoGrupo.nomeTestemunha1,
              qualificacao: novoAtendimentoCivil.quartoGrupo.qualificacaoTestemunha1,
              endereco: novoAtendimentoCivil.quartoGrupo.enderecoTestemunha1,
            },
            {
              nome: novoAtendimentoCivil.quartoGrupo.nomeTestemunha2,
              qualificacao: novoAtendimentoCivil.quartoGrupo.qualificacaoTestemunha2,
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
        status: novoAtendimentoCivil.quintoGrupo.status,
        envolvidos: {
          assistido: { ...novoAtendimentoCivil.segundoGrupo.assistido },
          estagiario: { ...novoAtendimentoCivil.primeiroGrupo.estagiario },
          professor: { ...novoAtendimentoCivil.primeiroGrupo.professor },
          secretaria: { id: '', nome: '' },
        },
      };

      this.atendimentoService
        .cadastrarAtendimento(novoAtendimentoFormatado)
        .subscribe({
          next: () => {
            alert('Cadastro realizado!');
            console.log(novoAtendimentoFormatado);
          },
          error: (err) => {
            alert('Erro ao cadastrar atendimento!');
            console.log(novoAtendimentoFormatado);
            console.log(err);
          },
        });
    }
  }

  cadastrarTrabalhista() {
    const formAtendimentoTrabalhista = this.formAtendimentoService.getForm();

    if(formAtendimentoTrabalhista?.valid){
      console.log('atendimento trabalhista está com os campos validados e pronto para enviar!');
      // implementar desserialização e cadastro na service
    }
  }
}

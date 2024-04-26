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
          testemunhas: novoAtendimentoCivil.quartoGrupo.testemunhas.map((testemunha) => {
            return {
              nome: testemunha.nome,
              qualificacao: testemunha.qualificacao,
              endereco: {
                cep: testemunha.endereco.cep,
                cidade: testemunha.endereco.cidade,
                logradouro: testemunha.endereco.logradouro,
                bairro: testemunha.endereco.bairro,
                complemento: testemunha.endereco.complemento,
                numero: testemunha.endereco.numero,
              }
            };
          }),
          parteContraria: {
            nome: novoAtendimentoCivil.terceiroGrupo.nome,
            qualificacao: novoAtendimentoCivil.terceiroGrupo.qualificacao,
            rg: novoAtendimentoCivil.terceiroGrupo.rg,
            cpf: novoAtendimentoCivil.terceiroGrupo.cpf,
            email: novoAtendimentoCivil.terceiroGrupo.email,
            endereco: {
              cep: novoAtendimentoCivil.terceiroGrupo.cep,
              cidade: novoAtendimentoCivil.terceiroGrupo.cidade,
              logradouro: novoAtendimentoCivil.terceiroGrupo.logradouro,
              bairro: novoAtendimentoCivil.terceiroGrupo.bairro,
              complemento: novoAtendimentoCivil.terceiroGrupo.complemento,
              numero: novoAtendimentoCivil.terceiroGrupo.numero,
            },
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
        historico: {
          titulo: '',
          descricao: novoAtendimentoCivil.quintoGrupo.historico,
          criadoPor: {
            nome: novoAtendimentoCivil.primeiroGrupo.estagiario.nome
          }
        }
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

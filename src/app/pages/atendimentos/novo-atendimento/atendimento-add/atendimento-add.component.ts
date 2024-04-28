import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentosService } from 'src/app/core/services/atendimentos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Atendimento } from 'src/app/core/types/atendimento';
import { StepperCivil, StepperTrabalhista } from 'src/app/core/types/steppers';

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
    private router: Router,
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
      const novoAtendimentoCivil = formAtendimentoCivil.getRawValue() as StepperCivil;

      const novoAtendimentoFormatado: Atendimento = {
        '@type': this.tipoFicha,
        id: '', // back-end irá implementar
        area: novoAtendimentoCivil.primeiroGrupo.area,
        instante: undefined, // back-end irá implementar
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
          medidaJudicial: novoAtendimentoCivil.quintoGrupo.medidaJudicial,
        },
        prazoEntregaDocumentos: '',
        status: novoAtendimentoCivil.quintoGrupo.status,
        envolvidos: {
          assistido: { ...novoAtendimentoCivil.segundoGrupo.assistido },
          estagiario: { ...novoAtendimentoCivil.primeiroGrupo.estagiario },
          professor: { ...novoAtendimentoCivil.primeiroGrupo.professor },
          secretaria: { id: '', nome: '' },
        },
        historico: novoAtendimentoCivil.quintoGrupo.historico.map((historicos) => {
          return {
            id: '',
            titulo: '',
            descricao: historicos.descricao,
            instante: undefined,
            criadoPor: historicos.criadoPor,
          }
        })
      };

      this.atendimentoService
        .cadastrarAtendimento(novoAtendimentoFormatado)
        .subscribe({
          next: () => {
            alert('Cadastro realizado!');
            console.log(novoAtendimentoFormatado);
            this.router.navigate(['/atendimentos']);
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

    if (formAtendimentoTrabalhista?.valid) {
      const novoAtendimentoTrabalhista = formAtendimentoTrabalhista.getRawValue() as StepperTrabalhista;
      console.log('atendimento trabalhista está com os campos validados e pronto para enviar!');

      const novoAtendimentoFormatado: Atendimento = {
        '@type': this.tipoFicha,
        id: '', // back-end irá implementar
        area: novoAtendimentoTrabalhista.primeiroGrupo.area,
        instante: undefined, // back-end irá implementar
        ficha: {
          '@type': this.tipoFicha,
          assinatura: '',
          dadosSensiveis: novoAtendimentoTrabalhista.quintoGrupo.dadosSensiveis,
          reclamado: {
            nome: '',
            endereco: {
              cep: '',
              cidade: '',
              logradouro: '',
              bairro: '',
              complemento: '',
              numero: '',
            },
            tipoPessoa: '',
            numCadastro: ''
          },
          testemunhas: [],
          relacaoEmpregaticia: {

          }
        },
        status: ''
      }
      // implementar desserialização e cadastro na service

      this.atendimentoService
        .cadastrarAtendimento(novoAtendimentoFormatado)
        .subscribe({
          next: () => {
            alert('Cadastro realizado!');
            console.log(novoAtendimentoFormatado);
            this.router.navigate(['/atendimentos']);
          },
          error: (err) => {
            alert('Erro ao cadastrar atendimento!');
            console.log(novoAtendimentoFormatado);
            console.log(err);
          },
        });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentosService } from 'src/app/core/services/atendimentos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Atendimento } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-atendimento-add',
  templateUrl: './atendimento-add.component.html',
  styleUrls: ['./atendimento-add.component.scss'],
})
export class AtendimentoAddComponent implements OnInit {
  tituloPagina = 'Nova Ficha';
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

    if (this.tipoAtendimento.toLowerCase() !== 'trabalhista') {
      this.tipoFicha = 'Civil';
    } else {
      this.tipoFicha = 'Trabalhista';
    }
  }

  cadastrarCivil() {
    const formAtendimentoCivil = this.formAtendimentoService.getForm();

    if (formAtendimentoCivil?.valid) {
      const novoAtendimentoCivil = formAtendimentoCivil.getRawValue() as Atendimento;

      const novoAtendimentoFormatado: Atendimento = {
        '@type': this.tipoFicha,
        id: '', // back-end irá implementar
        area: novoAtendimentoCivil.area,
        instante: undefined, // back-end irá implementar
        ficha: {
          '@type': this.tipoFicha,
          assinatura: novoAtendimentoCivil.ficha.assinatura,
          dadosSensiveis: novoAtendimentoCivil.ficha.dadosSensiveis,
          testemunhas: novoAtendimentoCivil.ficha.testemunhas?.map((testemunha) => {
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
            nome: novoAtendimentoCivil.ficha.parteContraria.nome,
            qualificacao: novoAtendimentoCivil.ficha.parteContraria.qualificacao,
            rg: novoAtendimentoCivil.ficha.parteContraria.rg,
            cpf: novoAtendimentoCivil.ficha.parteContraria.cpf,
            email: novoAtendimentoCivil.ficha.parteContraria.email,
            endereco: {
              cep: novoAtendimentoCivil.ficha.parteContraria.cep,
              cidade: novoAtendimentoCivil.ficha.parteContraria.cidade,
              logradouro: novoAtendimentoCivil.ficha.parteContraria.logradouro,
              bairro: novoAtendimentoCivil.ficha.parteContraria.bairro,
              complemento: novoAtendimentoCivil.ficha.parteContraria.complemento,
              numero: novoAtendimentoCivil.ficha.parteContraria.numero,
            },
            telefone: novoAtendimentoCivil.ficha.parteContraria.telefone,
          },
          medidaJudicial: novoAtendimentoCivil.ficha.parteContraria.medidaJudicial,
        },
        prazoEntregaDocumentos: '',
        status: novoAtendimentoCivil.status,
        envolvidos: {
          assistido: { id: novoAtendimentoCivil.envolvidos?.assistido.id, nome: novoAtendimentoCivil.envolvidos.assistido.nome },
          estagiario: { id: novoAtendimentoCivil.envolvidos.estagiario.id, nome: novoAtendimentoCivil.envolvidos.estagiario.nome },
          professor: { id: novoAtendimentoCivil.envolvidos.professor.id, nome: novoAtendimentoCivil.envolvidos.professor.id },
          secretaria: { id: novoAtendimentoCivil.envolvidos.secretaria.id, nome: novoAtendimentoCivil.envolvidos.secretaria.nome },
        },
        historico: novoAtendimentoCivil.historico?.map((historicos) => {
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
      const novoAtendimentoTrabalhista = formAtendimentoTrabalhista.getRawValue() as Atendimento;
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

import { FichaCivil, Testemunha, FichaTrabalhista, ParteContraria } from './../../../core/types/atendimento';
import { Atendimento } from 'src/app/core/types/atendimento';
import { FormsService } from './../../../core/services/forms.service';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentosService } from 'src/app/core/services/atendimentos.service';

@Component({
  selector: 'app-atendimento-edit',
  templateUrl: './atendimento-edit.component.html',
  styleUrls: ['./atendimento-edit.component.scss']
})
export class AtendimentoEditComponent {
  tituloPagina = 'Editar - ';
  tipoAtendimento!: string;
  tipoFicha!: string;
  idAtendimento!: string;
  atendimento!: Atendimento;
  form!: FormGroup<any> | null;

  constructor(
    private formService: FormsService,
    private formBuilder: FormBuilder,
    private atendimentoService: AtendimentosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tipoAtendimento = this.route.snapshot.paramMap.get('area') as string;
    this.idAtendimento = this.route.snapshot.paramMap.get('id') as string;
    this.tituloPagina += this.idAtendimento;

    if (this.tipoAtendimento.toLowerCase() !== 'trabalhista') {
      this.tipoFicha = 'Civil';
    } else {
      this.tipoFicha = 'Trabalhista';
    }

    this.atendimentoService.consultaAtendimento(this.idAtendimento).subscribe({
      next: (atendimento) => {
        this.atendimento = atendimento;
        console.log(atendimento);
        this.carregarFormulario();
      }
    })
  }

  carregarFormulario() {
    this.form = this.formService.getForm();
    this.form?.patchValue({
      id: this.atendimento.id,
      status: this.atendimento.status,
      area: this.atendimento.area,
      instante: this.atendimento.instante,
      ficha: {
        "@type": this.atendimento.ficha['@type'],
        assinatura: this.atendimento.ficha.assinatura,
        dadosSensiveis: this.atendimento.ficha.dadosSensiveis,
        testemunhas: this.atendimento.ficha.testemunhas
      },
      historico: this.atendimento.historico,
      envolvidos: {
        estagiario: {
          id: this.atendimento.envolvidos.assistido.id,
          nome: this.atendimento.envolvidos.assistido.nome
        },
        professor: {
          id: this.atendimento.envolvidos.professor.id,
          nome: this.atendimento.envolvidos.professor.nome
        },
        secretaria: {
          id: this.atendimento.envolvidos.secretaria.id,
          nome: this.atendimento.envolvidos.secretaria.nome
        },
        assistido: {
          id: this.atendimento.envolvidos.assistido.id,
          nome: this.atendimento.envolvidos.assistido.nome
        }
      }
    });

    const testemunhas = this.atendimento.ficha.testemunhas || [];
    const testemunhasFormArray = this.form?.get('ficha.testemunhas') as FormArray;
    testemunhasFormArray.clear();
    testemunhas.forEach(testemunha => {
      testemunhasFormArray.push(
        this.formBuilder.group({
          nome: testemunha.nome,
          qualificacao: testemunha.qualificacao,
          endereco: this.formBuilder.group({
            cep: testemunha.endereco?.cep,
            cidade: testemunha.endereco?.cidade,
            logradouro: testemunha.endereco?.logradouro,
            bairro: testemunha.endereco?.bairro,
            numero: testemunha.endereco?.numero,
            complemento: testemunha.endereco?.complemento
          })
        })
      );
    });

    if (this.tipoFicha === 'Civil') {
      const fichaCivil = this.atendimento.ficha as FichaCivil;

      this.form?.patchValue({
        ficha: {
          parteContraria: {
            nome: fichaCivil.parteContraria.nome,
            rg: fichaCivil.parteContraria.rg,
            cpf: fichaCivil.parteContraria.cpf,
            qualificacao: fichaCivil.parteContraria.qualificacao,
            telefone: fichaCivil.parteContraria.telefone,
            email: fichaCivil.parteContraria.email,
            endereco: {
              cep: fichaCivil.parteContraria.endereco?.cep,
              cidade: fichaCivil.parteContraria.endereco?.cidade,
              numero: fichaCivil.parteContraria.endereco?.numero,
              logradouro: fichaCivil.parteContraria.endereco?.logradouro,
              complemento: fichaCivil.parteContraria.endereco?.complemento,
              bairro: fichaCivil.parteContraria.endereco?.bairro,
            }
          },
          medidaJudicial: fichaCivil.medidaJudicial
        }
      });
    } else {
      const fichaTrabalhista = this.atendimento.ficha as FichaTrabalhista;

      this.form?.patchValue({
        ficha: {
          reclamado: {
            nome: fichaTrabalhista.reclamado.nome,
            tipoPessoa: fichaTrabalhista.reclamado.tipoPessoa,
            numCadastro: fichaTrabalhista.reclamado.numCadastro,
            endereco: {
              cep: fichaTrabalhista.reclamado.endereco?.cep,
              cidade: fichaTrabalhista.reclamado.endereco?.cidade,
              logradouro: fichaTrabalhista.reclamado.endereco?.logradouro,
              bairro: fichaTrabalhista.reclamado.endereco?.bairro,
              numero: fichaTrabalhista.reclamado.endereco?.numero,
              complemento: fichaTrabalhista.reclamado.endereco?.complemento
            }
          },
          relacaoEmpregaticia: {
            dataAdmissao: fichaTrabalhista.relacaoEmpregaticia?.dataAdmissao,
            dataSaida: fichaTrabalhista.relacaoEmpregaticia?.dataSaida,
            funcaoExercida: fichaTrabalhista.relacaoEmpregaticia?.funcaoExercida,
            valorSalarioCtps: fichaTrabalhista.relacaoEmpregaticia?.valorSalarioCtps,
            salarioAnotadoCtps: fichaTrabalhista.relacaoEmpregaticia?.salarioAnotadoCtps,
            valorUltimaRemuneracao: fichaTrabalhista.relacaoEmpregaticia?.valorUltimaRemuneracao,
            ctpsAssinadaCerto: fichaTrabalhista.relacaoEmpregaticia?.ctpsAssinadaCerto,
            dispensa: fichaTrabalhista.relacaoEmpregaticia?.dispensa,
            jornadaTrabalho: fichaTrabalhista.relacaoEmpregaticia?.jornadaTrabalho,
            tempoAlmoco: fichaTrabalhista.relacaoEmpregaticia?.tempoAlmoco,
          }
        }
      });
    }
  }

  editarCivil() {
    const dadosAtualizados: Atendimento = {
      "@type": this.form?.value['@type'],
      status: this.form?.value.status,
      area: this.form?.value.area,
      ficha: {
        "@type": this.form?.value.ficha['@type'],
        assinatura: this.form?.value.ficha.assinatura,
        dadosSensiveis: this.form?.value.ficha.dadosSensiveis,
        testemunhas: this.form?.value.ficha.testemunhas,
        parteContraria: {
          nome: this.form?.value.ficha.parteContraria.nome,
          rg: this.form?.value.ficha.parteContraria.rg,
          cpf: this.form?.value.ficha.parteContraria.cpf,
          qualificacao: this.form?.value.ficha.parteContraria.qualificacao,
          telefone: this.form?.value.ficha.parteContraria.telefone,
          email: this.form?.value.ficha.parteContraria.email,
          endereco: {
            cep: this.form?.value.ficha.parteContraria.endereco?.cep,
            cidade: this.form?.value.ficha.parteContraria.endereco?.cidade,
            numero: this.form?.value.ficha.parteContraria.endereco?.numero,
            logradouro: this.form?.value.ficha.parteContraria.endereco?.logradouro,
            complemento: this.form?.value.ficha.parteContraria.endereco?.complemento,
            bairro: this.form?.value.ficha.parteContraria.endereco?.bairro,
          }
        },
        medidaJudicial: this.form?.value.ficha.medidaJudicial,
      },
      historico: [{
        titulo: '',
        descricao: this.form?.value.historico[0].descricao,
        criadoPor: {
          nome: this.form?.value.historico[0].criadoPor.nome,
        },
      }],
      envolvidos: {
        estagiario: {
          id: this.form?.value.envolvidos.estagiario.id,
          nome: this.form?.value.envolvidos.estagiario.nome,
        },
        professor: {
          id: this.form?.value.envolvidos.professor.id,
          nome: this.form?.value.envolvidos.professor.nome,
        },
        secretaria: {
          id: this.form?.value.envolvidos.secretaria.id,
          nome: this.form?.value.envolvidos.secretaria.nome,
        },
        assistido: {
          id: this.form?.value.envolvidos.assistido.id,
          nome: this.form?.value.envolvidos.assistido.nome,
        },
      }
    };

    this.atendimentoService.atualizarAtendimento(dadosAtualizados, this.idAtendimento).subscribe({
      next: () => {
        alert('Atendimento atualizado com sucesso!');
        this.router.navigate(['/atendimentos']);
        console.log(dadosAtualizados);

      },
      error: (err) => {
        alert('Erro ao atualizar atendimento!');
        console.log('Erro at: ', err);
      }
    });
  }

  editarTrabalhista() {

  }

  excluir(){
    this.atendimentoService.excluirAtendimento(this.idAtendimento).subscribe({
      next: () => {
        alert('Sucesso ao excluir atendimento!');
      },
      error: (err) => {
        alert('Erro ao excluir atendimento');
        console.log("Erro ao excluir: ", err);
      }
    })
  }
}

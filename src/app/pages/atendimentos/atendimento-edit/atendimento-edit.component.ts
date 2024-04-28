import { FichaCivil, Testemunha, FichaTrabalhista } from './../../../core/types/atendimento';
import { Atendimento } from 'src/app/core/types/atendimento';
import { FormsService } from './../../../core/services/forms.service';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
      primeiroGrupo: {
        estagiario: {
          id: this.atendimento.envolvidos?.estagiario.id,
          nome: this.atendimento.envolvidos?.estagiario.nome
        },
        professor: {
          id: this.atendimento.envolvidos?.professor.id,
          nome: this.atendimento.envolvidos?.professor.nome
        },
        secretaria: {
          id: this.atendimento.envolvidos?.secretaria.id,
          nome: this.atendimento.envolvidos?.secretaria.nome
        },
        instante: this.atendimento.instante,
        area: this.atendimento.area,
      },
      segundoGrupo: {
        assistido: {
          id: this.atendimento.envolvidos?.assistido.id,
          nome: this.atendimento.envolvidos?.assistido.nome
        }
      },
    });

    if (this.tipoFicha === 'Civil') {
      const fichaCivil = this.atendimento.ficha as FichaCivil;

      this.form?.patchValue({
        terceiroGrupo: {
          nome: fichaCivil.parteContraria.nome,
          rg: fichaCivil.parteContraria.rg,
          cpf: fichaCivil.parteContraria.cpf,
          qualificacao: fichaCivil.parteContraria.qualificacao,
          telefone: fichaCivil.parteContraria.telefone,
          email: fichaCivil.parteContraria.email,
          cep: fichaCivil.parteContraria.endereco?.cep,
          cidade: fichaCivil.parteContraria.endereco?.cidade,
          numero: fichaCivil.parteContraria.endereco?.numero,
          logradouro: fichaCivil.parteContraria.endereco?.logradouro,
          complemento: fichaCivil.parteContraria.endereco?.complemento,
          bairro: fichaCivil.parteContraria.endereco?.bairro,
        },
        quintoGrupo: {
          historico: this.atendimento.historico,
          status: this.atendimento.status,
          assinatura: fichaCivil.assinatura,
          dadosSensiveis: fichaCivil.dadosSensiveis,
          medidaJudicial: fichaCivil.medidaJudicial,
        }
      });

      const testemunhas = this.atendimento.ficha.testemunhas || [];
      const testemunhasFormArray = this.form?.get('quartoGrupo.testemunhas') as FormArray;
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
    } else {
      const fichaTrabalhista = this.atendimento.ficha as FichaTrabalhista;
      this.form?.patchValue({
        terceiroGrupo: {
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
        }
      })
    }
  }

  editarCivil() {

  }

  editarTrabalhista() {

  }
}

import { FichaCivil, Testemunha } from './../../../core/types/atendimento';
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
        instante: this.atendimento.instante,
        area: this.atendimento.area,
      },
      segundoGrupo: {
        assistido: {
          id: this.atendimento.envolvidos?.assistido.id,
          nome: this.atendimento.envolvidos?.assistido.nome
        }
      },
      quintoGrupo: {
        historico: this.atendimento.historico?.descricao,
        status: this.atendimento.status,
        assinatura: this.atendimento.ficha.assinatura,
        dadosSensiveis: this.atendimento.ficha.dadosSensiveis
      }
    });

    if ('parteContraria' in this.atendimento.ficha) {
      this.form?.patchValue({
        terceiroGrupo: {
          nome: this.atendimento.ficha.parteContraria.nome,
          rg: this.atendimento.ficha.parteContraria.rg,
          cpf: this.atendimento.ficha.parteContraria.cpf,
          qualificacao: this.atendimento.ficha.parteContraria.qualificacao,
          telefone: this.atendimento.ficha.parteContraria.telefone,
          email: this.atendimento.ficha.parteContraria.email,
          cep: this.atendimento.ficha.parteContraria.endereco?.cep,
          bairro: this.atendimento.ficha.parteContraria.endereco?.bairro,
          logradouro: this.atendimento.ficha.parteContraria.endereco?.logradouro,
        },

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
    }
  }

  editarCivil() {

  }

  editarTrabalhista() {

  }
}

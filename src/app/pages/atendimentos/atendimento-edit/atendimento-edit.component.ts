import { Atendimento } from 'src/app/core/types/atendimento';
import { FormsService } from './../../../core/services/forms.service';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
      terceiroGrupo: {
      }
    });
  }

  editarCivil() {

  }

  editarTrabalhista() {

  }
}

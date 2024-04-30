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

  cadastrar() {
    const formAtendimento = this.formAtendimentoService.getForm();

    if (formAtendimento?.valid) {
      const novoAtendimentoCivil = formAtendimento.getRawValue() as Atendimento;

      this.atendimentoService
        .cadastrarAtendimento(novoAtendimentoCivil)
        .subscribe({
          next: () => {
            alert('Cadastro realizado!');
            console.log(novoAtendimentoCivil);
            this.router.navigate(['/atendimentos']);
          },
          error: (err) => {
            alert('Erro ao cadastrar atendimento!');
            console.log(novoAtendimentoCivil);
            console.log(err);
          },
        });
    }
  }
}

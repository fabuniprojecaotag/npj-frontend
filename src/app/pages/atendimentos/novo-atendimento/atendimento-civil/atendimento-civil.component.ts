import { Component } from '@angular/core';
import { AtendimentosService } from 'src/app/core/services/atendimentos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Atendimento } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-atendimento-civil',
  templateUrl: './atendimento-civil.component.html',
  styleUrls: ['./atendimento-civil.component.scss']
})
export class AtendimentoCivilComponent {
  tituloPagina = 'Atendimento Civil';
  tipoAtendimento = 'Civil';

  constructor(private formAtendimentoService: FormsService, private atendimentoService: AtendimentosService) { }

  cadastrar() {
    const formAtendimentoCivil = this.formAtendimentoService.getForm();

    if(formAtendimentoCivil?.valid){
      const novoAtendimentoCivil = formAtendimentoCivil.getRawValue() as Atendimento;
      console.log('Meu atendimento cadastrado:', novoAtendimentoCivil);

      this.atendimentoService.cadastrarAtendimento(novoAtendimentoCivil).subscribe({
        next: () => {
          alert("Cadastro realizado!");
        },
        error: (err) => {
          alert("Erro ao cadastrar atendimento!");
          console.log("Erro ao cadastrar atendimento: ", err);
        }
      })
    }
  }
}

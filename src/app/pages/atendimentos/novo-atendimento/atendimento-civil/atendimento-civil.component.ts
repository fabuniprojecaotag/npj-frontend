import { Component } from '@angular/core';
import { FormsService } from 'src/app/core/services/forms.service';
import { Atendimento } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-atendimento-civil',
  templateUrl: './atendimento-civil.component.html',
  styleUrls: ['./atendimento-civil.component.scss']
})
export class AtendimentoCivilComponent {
  tituloPagina = 'Atendimento Civil';

  constructor(private formAtendimentoService: FormsService) { }

  cadastrar() {
    const formAtendimentoCivil = this.formAtendimentoService.getForm();

    if(formAtendimentoCivil?.valid){
      const novoAtendimentoCivil = formAtendimentoCivil.getRawValue() as Atendimento;
      console.log('meu atendumento cadastrado:', novoAtendimentoCivil);
      alert("Cadastro realizado!(teste)");
    }
  }
}

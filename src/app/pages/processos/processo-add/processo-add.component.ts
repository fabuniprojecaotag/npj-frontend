import { Component } from '@angular/core';
import { FormProcessosService } from 'src/app/core/services/form-processos.service';
import { ProcessosService } from 'src/app/core/services/processos.service';
import { Processo } from 'src/app/core/types/processo';

@Component({
  selector: 'app-processo-add',
  templateUrl: './processo-add.component.html',
  styleUrls: ['./processo-add.component.scss']
})
export class ProcessoAddComponent {
  tituloPagina = 'Processo';

  constructor(private processsoService: ProcessosService, 
      private formService: FormProcessosService) {}

  cadastrar() {
    const formCadastroProcesso = this.formService.getCadastro();

    if (formCadastroProcesso?.valid) {
      const novoCadastro = formCadastroProcesso.getRawValue() as Processo;
      this.processsoService.cadastraProcesso(novoCadastro).subscribe({ 
        next: (value)=> {
          alert("Processo cadastrado com sucesso!");
        },
        error: (err)=> {
          alert("Erro ao criar processo!");
          console.log(err);
        }      
       });
    }
  }
}

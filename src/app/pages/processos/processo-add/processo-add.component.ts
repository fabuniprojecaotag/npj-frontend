import { Component } from '@angular/core';
import { FormsService } from 'src/app/core/services/forms.service';
import { ProcessosService } from 'src/app/core/services/processos.service';
import { Processo } from 'src/app/core/types/processo';

@Component({
  selector: 'app-processo-add',
  templateUrl: './processo-add.component.html',
  styleUrls: ['./processo-add.component.scss']
})
export class ProcessoAddComponent {
  tituloPagina = 'Processo';

  constructor(
    private processsoService: ProcessosService,
    private formService: FormsService
    ) { }

  cadastrar() {
    const formCadastroProcesso = this.formService.getForm();

    if (formCadastroProcesso?.valid) {
      const novoCadastro = formCadastroProcesso.getRawValue() as Processo;
      this.processsoService.cadastraProcesso(novoCadastro).subscribe({
        next: () => {
          alert("Processo cadastrado com sucesso!");
        },
        error: (err) => {
          alert("Erro ao criar processo!");
          console.log(err);
        }
      });
    }
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssistidosService } from 'src/app/core/services/assistidos.service';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormAssistidosService } from 'src/app/core/services/form-assistidos.service';
import { Assistido } from 'src/app/core/types/assistido';
import { ModalCriadoComponent } from 'src/app/shared/modal-criado/modal-criado.component';

@Component({
  selector: 'app-assistido-add',
  templateUrl: './assistido-add.component.html',
  styleUrls: ['./assistido-add.component.scss']
})
export class AssistidoAddComponent {
  tituloDaPagina: string = 'Novo Assistido';

  constructor(private formAssistidosService: FormAssistidosService, private assistidoService: AssistidosService, private router: Router, private dialog: MatDialog) { }

  cadastrar(): void {
    const formCadastroAssistido = this.formAssistidosService.getCadastro();

    if (formCadastroAssistido?.valid) {
      const novoAssistido = formCadastroAssistido.getRawValue() as Assistido;
      console.log('meu assistido cadastrado:', novoAssistido);

      this.assistidoService.cadastrarAssistido(novoAssistido).subscribe({
        next: (value) => {
          this.abrirModal();
          this.router.navigate(['/assistidos']);
          console.log('cadastro realizado com  sucesso: ', value);
        },
        error: (err) => {
          alert('erro ao realizar cadastro!');
          console.log('erro ao realizar cadastro: ', err)
        }
      })
    }
  }

  abrirModal() {
    this.dialog.open(ModalCriadoComponent, {
      width: '552px',
      height: '360px'
    })
  }
}

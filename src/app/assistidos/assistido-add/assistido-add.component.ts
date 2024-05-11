import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssistidosService } from 'src/app/assistidos/services/assistidos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Assistido } from 'src/app/core/types/assistido';
import { ModalAssistidoComponent } from 'src/app/shared/modal-assistido/modal-assistido.component';

@Component({
  selector: 'app-assistido-add',
  templateUrl: './assistido-add.component.html',
  styleUrls: ['./assistido-add.component.scss'],
})
export class AssistidoAddComponent {
  tituloDaPagina: string = 'Novo Assistido';

  constructor(
    private formAssistidosService: FormsService,
    private assistidoService: AssistidosService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  cadastrar(): void {
    const formCadastroAssistido = this.formAssistidosService.getForm();

    if (formCadastroAssistido?.valid) {
      const novoAssistido = formCadastroAssistido.getRawValue() as Assistido;
      this.assistidoService.cadastrarAssistido(novoAssistido).subscribe({
        next: (value) => {
          this.abrirModal(value);
          this.router.navigate(['/assistidos']);
        },
        error: (err) => { },
      });
    }
  }

  abrirModal(novoAssistido: Assistido) {
    this.dialog.open(ModalAssistidoComponent, {
      width: '552px',
      height: '360px',
      data: { operacao: 'criado', nome: novoAssistido.nome, email: novoAssistido.email, cpf: novoAssistido.cpf }
    })
  }
}

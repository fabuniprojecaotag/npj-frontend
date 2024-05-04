import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssistidosService } from 'src/app/core/services/assistidos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Assistido } from 'src/app/core/types/assistido';
import { ModalCriadoComponent } from 'src/app/shared/modal-criado/modal-criado.component';

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
        error: (err) => {
          switch(err.status) {
            case 401: {
              alert("Erro 401!\nErro ao Cadastrar! Não Autorizado!");
              break;
            }
            case 403: {
              alert("Erro 403!\nErro ao Cadastrar! Cadastro não foi aceito no servidor!");
              break;
            }
            case 404: {
              alert("Erro 404!\nErro ao Cadastrar! Recurso não encontrado!");
              break;
            }
            case 408: {
              alert("Erro 408!\nErro ao Cadastrar! Servidor demorou muito para respoonder!");
              break;
            }
            case 422: {
              alert(`Erro 422!\nErro ao Cadastrar! Padrão não correspondente ao servidor!\n${err.message}`);
              break;
            }
            default: {
              alert(`Erro Desconhecido!\nErro ao Cadastrar!\n Por favor tente mais tarde!`);
              break;
            }
          }
        },
      });
    }
  }

  abrirModal(novoAssistido: Assistido) {
    this.dialog.open(ModalCriadoComponent, {
      width: '552px',
      height: '360px',
      data: { tituloCriado: 'Assistido', nome: novoAssistido.nome, email: novoAssistido.email }
    })
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Usuario } from 'src/app/core/types/usuario';
import { ModalAssistidoComponent } from 'src/app/shared/modal-assistido/modal-assistido.component';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent {
  tituloDaPagina: string = 'Novo Usuário';
  errorMessage!: string;
  subtituloErro = "Erro ao Cadastrar";

  constructor(
    private formularioService: FormsService,
    private cadastroService: CadastroService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  cadastrar(redirecionar: boolean) {
    const formCadastro = this.formularioService.getForm();
    if (formCadastro?.valid) {
      const novoCadastro = formCadastro.getRawValue() as Usuario;
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: () => {
          this.abrirModal(novoCadastro);
          if(redirecionar){
            this.router.navigate(['/users']);
          }
        },
        error: (err) => {
          switch (err.status) {
            case 401: {
              this.errorMessage = "Não Autorizado!";
              this.mostrarMensagemErro('401', this.errorMessage);
              break;
            }
            case 403: {
              this.errorMessage = "Cadastro não foi aceito no servidor!";
              this.mostrarMensagemErro('403', this.errorMessage);
              break;
            }
            case 404: {
              this.errorMessage = "Recurso não encontrado!";
              this.mostrarMensagemErro('404', this.errorMessage);
              break;
            }
            case 408: {
              this.errorMessage = "Servidor demorou muito para responder!";
              this.mostrarMensagemErro('408', this.errorMessage);
              break;
            }
            case 422: {
              this.errorMessage = `Padrão não correspondente ao do servidor!<br>`;
              err.error.errors.forEach((error: any) => {
                this.errorMessage += `${error.field}: ${error.message}<br>`;
              });
              this.mostrarMensagemErro('422', this.errorMessage);
              break;
            }
            default: {
              this.errorMessage = `Por favor tente mais tarde!`;
              this.mostrarMensagemErro('Desconhecido', this.errorMessage);
              break;
            }
          }
        },
      });
    }
  }

  abrirModal(novoCadastro: Usuario) {
    this.dialog.open(ModalAssistidoComponent, {
      width: '552px',
      height: '360px',
      data: {
        tituloCriado: 'Usuário',
        nome: novoCadastro.nome,
        email: novoCadastro.email,
      },
    });
  }

  mostrarMensagemErro(codigoErro: string, mensagemErro: string) {
    this.dialog.open(ModalErrosComponent, {
      width: '552px',
      height: '360px',
      position: { top: '0' },
      data: { codigoErro: codigoErro, subtituloErro: this.subtituloErro, mensagemErro: mensagemErro }
    })
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Usuario } from 'src/app/core/types/usuario';
import { ModalAssistidoComponent } from 'src/app/shared/modal-assistido/modal-assistido.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent {
  tituloDaPagina = 'Novo Usuário';
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
          if (redirecionar) {
            this.router.navigate(['/users/list']);
          }
        },
        error: (err) => { },
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
}

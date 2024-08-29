import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Usuario } from 'src/app/core/types/usuario';
import { ModalUsuarioComponent } from 'src/app/shared/modal-usuario/modal-usuario.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent {
  tituloDaPagina = 'Novo Usuário';

  constructor(
    private formularioService: FormsService,
    private cadastroService: CadastroService,
    private dialog: MatDialog
  ) { }

  cadastrarUsuario() {
    const formCadastro = this.formularioService.getForm();

    if (formCadastro?.valid) {
      const novoCadastro = formCadastro.getRawValue() as Usuario;

      this.cadastroService.cadastrar(novoCadastro)
        .pipe(debounceTime(500))
        .subscribe({
          next: () => {
            this.abrirModal(novoCadastro);
          }
        });
    }
  }

  private abrirModal(novoCadastro: Usuario) {
    this.dialog.open(ModalUsuarioComponent, {
      width: '552px',
      height: '360px',
      data: {
        tituloCriado: 'Usuário',
        nome: novoCadastro.nome,
        email: novoCadastro.email,
        senha: novoCadastro.senha,
        tipo: novoCadastro.role
      },
    });
  }
}

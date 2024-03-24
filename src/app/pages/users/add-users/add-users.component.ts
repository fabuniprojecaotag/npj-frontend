import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormUserService } from 'src/app/core/services/form-user.service';
import { Usuario } from 'src/app/core/types/usuario';
import { ModalCriadoComponent } from 'src/app/shared/modal-criado/modal-criado.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {
  tituloDaPagina: string = 'Adicionar Usuários';

  constructor(
    private formularioService: FormUserService,
    private cadastroService: CadastroService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  cadastrar() {
    const formCadastro = this.formularioService.getCadastro();
    if (formCadastro?.valid) {
      const novoCadastro = formCadastro.getRawValue() as Usuario;
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
          this.abrirModal(novoCadastro);
          console.log('cadastro realizado com  sucesso: ', value);
        },
        error: (err) => {
          alert('erro ao realizar cadastro!');
          console.log('erro ao realizar cadastro: ', err);
        }
      })
    }
  }

  cadastrarRedirecionando() {
    const formCadastro = this.formularioService.getCadastro();
    if (formCadastro?.valid) {
      const novoCadastro = formCadastro.getRawValue() as Usuario;
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
          this.abrirModal(novoCadastro);
          this.router.navigate(['/users']);
          console.log('cadastro realizado com  sucesso: ', value);
        },
        error: (err) => {
          alert('erro ao realizar cadastro!');
          console.log('erro ao realizar cadastro: ', err);
        }
      })
    }
  }

  abrirModal(novoCadastro: Usuario) {
    this.dialog.open(ModalCriadoComponent, {
      width: '552px',
      height: '360px',
      data: { tituloCriado: 'Usuário', nome: novoCadastro.nome, email: novoCadastro.email }
    })
  }
}

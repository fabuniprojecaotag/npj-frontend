import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormUserService } from 'src/app/core/services/form-user.service';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {
  tituloDaPagina: string = 'Adicionar Usuários';

  constructor (private formularioService: FormUserService, private cadastroService: CadastroService, private router: Router) {}

  cadastrar() {
    const formCadastro = this.formularioService.getCadastro();
    if(formCadastro?.valid){
      const novoCadastro = formCadastro.getRawValue() as Usuario;
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
          this.router.navigate(['/users']);
          console.log('cadastro realizado com  sucesso: ', value);
        },
        error: (err) => {
          alert('erro ao realizar cadastro!');
          console.log('erro ao realizar cadastro: ', err)
        }
      })
    }
  }
}

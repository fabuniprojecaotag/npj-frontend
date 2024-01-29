import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormUserService } from 'src/app/core/services/form-user.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  tituloPagina = 'Meu Perfil';
  perfilComponente = true;

  token = '';
  cadastro!: Usuario;
  form!: FormGroup<any> | null;

  constructor(private tokenService: TokenService,
    private cadastroService: CadastroService,
    private formUserService: FormUserService,
    private router: Router) { }

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.buscarMeuUsuario().subscribe({
      next: (user) => {
        this.cadastro = user;
        console.log(this.cadastro);
        this.carregarFormulario();
      },
      error: (err) => {
        console.log("Erro ao recupera Usuário:" + err);
      }
    });
  }

  carregarFormulario(): void {
    this.form = this.formUserService.getCadastro();
    this.form?.patchValue({
      nome: this.cadastro.username,
      matricula: this.cadastro.matricula,
      // telefone: this.cadastro.telefone,
      semestre: this.cadastro.semestre,
      status: this.cadastro.accountNonLocked,
      perfil: this.cadastro.perfil,
      email: this.cadastro.email,
      senha: null,
    });


  }

  atualizarUsuario() {
    const dadosAtualizados: Usuario = {
      username: this.form?.value.nome,
      matricula: this.form?.value.matricula,
      // telefone: this.form?.value.telefone,
      semestre: this.form?.value.semestre,
      accountNonLocked: this.form?.value.status,
      perfil: this.form?.value.perfil,
      email: this.form?.value.email,
      password: this.form?.value.senha,
    }

    this.cadastroService.editarCadastro(dadosAtualizados).subscribe({
      next: () => {
        alert('Cadastro editado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('erro ao atualiza cadastro: ', err);
      }
    });
  }
}

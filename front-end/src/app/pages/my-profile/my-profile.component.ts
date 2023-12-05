import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormUserService } from 'src/app/core/services/form-user.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Usuario, Perfil } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  tituloPagina = 'Meu Perfil';

  token = '';
  cadastro!: Usuario;
  form!: FormGroup<any> | null;

  constructor(private tokenService: TokenService, private cadastroService: CadastroService, private formUserService: FormUserService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.buscarCadastro().subscribe(cadastro => {
      this.cadastro = cadastro;
      this.carregarFormulario();
    })
  }

  carregarFormulario (): void {
    this.form = this.formUserService.getCadastro();
    this.form?.patchValue({
      nome: this.form?.value.nome,
      matricula: this.cadastro.matricula,
      // telefone: this.cadastro.telefone,
      semestre: this.cadastro.semestre,
      status: this.cadastro.status,
      perfil: this.cadastro.perfil.nome,
      email: this.cadastro.email,
      senha: null,
    })

    const dadosAtualizados = {
      nome: this.form?.value.nome,
      matricula: this.form?.value.matricula,
      telefone: this.form?.value.telefone,
      semestre: this.form?.value.semestre,
      status: this.form?.value.status,
      perfil: this.form?.value.perfil,
      perfil_id: this.form?.value.perfil_id,
      email: this.form?.value.email,
      senha: this.form?.value.senha,
    }

    this.cadastroService.editarCadastro(dadosAtualizados).subscribe({
      next: (response) => {
        alert('Cadastro editado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('erro ao atualiza cadastro: ', err);
      }
    });
  }

  atualizarUsuario() {
    alert('usuário atualizado (so testando a chamada da função)');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  tituloPagina = 'Meu Perfil';
  perfilComponente = true;

  token = '';
  cadastro!: Usuario;
  form!: FormGroup<any> | null;

  constructor(
    private tokenService: TokenService,
    private cadastroService: CadastroService,
    private formUserService: FormsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.buscarMeuUsuario().subscribe({
      next: (user) => {
        this.cadastro = user;
        this.carregarFormulario();
      },
      error: () => {
        alert('Erro ao recuperar usuário');
      },
    });
  }

  carregarFormulario(): void {
    this.form = this.formUserService.getForm();
    this.form?.patchValue({
      nome: this.cadastro.nome,
      matricula: this.cadastro.matricula,
      cpf: this.cadastro.cpf,
      semestre: this.cadastro.semestre,
      status: this.cadastro.status,
      perfil: this.cadastro.role,
      email: this.cadastro.email,
      senha: null,
      unidadeInstitucional: this.cadastro.unidadeInstitucional,
    });
  }

  atualizarUsuario() {
    const dadosAtualizados: Usuario = {
      '@type': this.form?.value.type,
      id: this.form?.value.id,
      cpf: this.form?.value.cpf,
      nome: this.form?.value.nome,
      matricula: this.form?.value.matricula,
      semestre: this.form?.value.semestre,
      status: this.form?.value.status,
      role: this.form?.value.perfil,
      email: this.form?.value.email,
      senha: this.form?.value.senha,
      unidadeInstitucional: this.form?.value.unidadeInstitucional,
      supervisor: this.form?.value.supervisor,
    };

    this.cadastroService
      .editarCadastro(dadosAtualizados, dadosAtualizados.email)
      .subscribe({
        next: () => {
          alert('Cadastro atualizado com sucesso!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Erro ao atualizar cadastro');
        },
      });
  }
}

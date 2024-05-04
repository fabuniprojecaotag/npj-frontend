import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Usuario } from 'src/app/core/types/usuario';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';

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
    private router: Router,
    private dialog: MatDialog
  ) { }

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
          let errorMessage: string = '';

          switch (err.status) {
            case 401: {
              errorMessage = "Não Autorizado!";
              this.mostrarMensagemErro('401', errorMessage);
              break;
            }
            case 403: {
              errorMessage = "Cadastro não foi aceito no servidor!";
              this.mostrarMensagemErro('403', errorMessage);
              break;
            }
            case 404: {
              errorMessage = "Recurso não encontrado!";
              this.mostrarMensagemErro('404', errorMessage);
              break;
            }
            case 408: {
              errorMessage = "Servidor demorou muito para responder!";
              this.mostrarMensagemErro('408', errorMessage);
              break;
            }
            case 422: {
              errorMessage = `Padrão não correspondente ao do servidor!<br>`;
              err.error.errors.forEach((error: any) => {
                errorMessage += `${error.field}: ${error.message}<br>`;
              });
              this.mostrarMensagemErro('422', errorMessage);
              break;
            }
            default: {
              errorMessage = `Por favor tente mais tarde!`;
              this.mostrarMensagemErro('Desconhecido', errorMessage);
              break;
            }
          }
        },
      });
  }

  mostrarMensagemErro(codigoErro: string, mensagemErro: string) {
    let subtituloErro: string = 'Erro ao atualizar';

    this.dialog.open(ModalErrosComponent, {
      width: '552px',
      height: '360px',
      position: { top: '0' },
      data: { codigoErro: codigoErro, subtituloErro: subtituloErro, mensagemErro: mensagemErro }
    })
  }
}

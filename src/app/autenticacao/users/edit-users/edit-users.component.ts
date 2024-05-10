import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Usuario } from 'src/app/core/types/usuario';
import { FormsService } from 'src/app/core/services/forms.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalExcluidoComponent } from 'src/app/shared/modal-excluido/modal-excluido.component';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';
import { ModalUsuarioComponent } from 'src/app/shared/modal-usuario/modal-usuario.component';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss'],
})
export class EditUsersComponent implements OnInit {
  tituloDaPagina: string = 'Editar Usuário';
  cadastro!: Usuario;
  errorMessage!: string;
  form!: FormGroup<any> | null;
  idParam = this.route.snapshot.paramMap.get('id') as string;
  subtituloErro = "Erro ao Editar";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: CadastroService,
    private formUserService: FormsService,
    private cadastroService: CadastroService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.usuarioService.buscarCadastro(this.idParam).subscribe((usuario) => {
      this.cadastro = usuario;
      this.carregarFormulario();
    });
  }

  carregarFormulario() {
    this.form = this.formUserService.getForm();
    this.form?.patchValue({
      // "@type": this.cadastro['@type'],
      id: this.cadastro.id,
      nome: this.cadastro.nome,
      matricula: this.cadastro.matricula,
      semestre: this.cadastro.semestre,
      role: this.cadastro.role,
      email: this.cadastro.email,
      status: this.cadastro.status,
      cpf: this.cadastro.cpf,
      unidadeInstitucional: this.cadastro.unidadeInstitucional,
      supervisor: this.cadastro.supervisor,
    });
  }

  editar() {
    const formValue = this.form?.value;

    const senhaPresente = formValue.senha !== null && formValue.senha !== undefined;

    const dadosAtualizados: Usuario = {
      ...formValue,
      ...(senhaPresente && { senha: formValue.senha }),
    };

    this.cadastroService
      .editarCadastro(dadosAtualizados, this.idParam)
      .subscribe({
        next: () => {
          this.abrirModalEditar(dadosAtualizados);
          this.router.navigate(['/users/list']);
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

  excluir(idCadastro: string) {
    this.cadastroService.excluirCadastro(idCadastro).subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
      error: () => {
        alert('Erro ao excluir o usuário!');
      },
    });
  }

  abrirModalExcluir(user: Usuario) {
    this.dialog.open(ModalExcluidoComponent, {
      width: '372px',
      height: '228px',
      data: {
        tituloCriado: 'Usuário',
        nome: user.nome,
        deletar: () => this.excluir(user.id),
      },
    });
  }

  abrirModalEditar(usuario: Usuario){
    this.dialog.open(ModalUsuarioComponent, {
      width: '552px',
      height: '360px',
      data: { operacao: "Editado", nome: usuario.nome, tipo: usuario.role, email: usuario.email, senha: usuario.senha }
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

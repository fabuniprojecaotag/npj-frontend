import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Usuario } from 'src/app/core/types/usuario';
import { ModalExcluidoComponent } from 'src/app/shared/modal-excluido/modal-excluido.component';
import { ModalUsuarioComponent } from 'src/app/shared/modal-usuario/modal-usuario.component';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss'],
})
export class EditUsersComponent implements OnInit {
  tituloDaPagina = 'Editar Usuário';
  cadastro!: Usuario;
  errorMessage!: string;
  form!: FormGroup | null;
  idParam = this.route.snapshot.paramMap.get('id') as string;
  subtituloErro = 'Erro ao Editar';

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
      '@type': formValue['@type'],
      id: formValue.id,
      email: formValue.email,
      nome: formValue.nome,
      cpf: formValue.cpf,
      unidadeInstitucional: formValue.unidadeInstitucional,
      status: formValue.status,
      role: formValue.role,
    };

    if (senhaPresente) {
      dadosAtualizados.senha = formValue.senha;
    }

    if (formValue.role === 'ESTAGIARIO') {
      dadosAtualizados.matricula = formValue.matricula;
      dadosAtualizados.semestre = formValue.semestre;
      dadosAtualizados.supervisor = formValue.supervisor;
    }

    this.cadastroService
      .editarCadastro(dadosAtualizados, this.idParam)
      .subscribe({
        next: () => {
          this.abrirModalEditar(dadosAtualizados);
          this.router.navigate(['/users/list']);
        },
        error: (err) => { },
      });
  }

  excluir(idCadastro: string) {
    this.cadastroService.excluirCadastro(idCadastro).subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
      error: () => { },
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

  abrirModalEditar(usuario: Usuario) {
    this.dialog.open(ModalUsuarioComponent, {
      width: '552px',
      height: '360px',
      data: { operacao: 'Editado', nome: usuario.nome, tipo: usuario.role, email: usuario.email, senha: usuario.senha }
    });
  }
}

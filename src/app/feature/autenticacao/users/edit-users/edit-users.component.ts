import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { CadastroService } from 'src/app/feature/autenticacao/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Payload } from 'src/app/core/types/payload';
import { PendingChanges } from 'src/app/core/types/pending-changes';
import { Usuario } from 'src/app/core/types/usuario';
import { ModalExcluidoComponent } from 'src/app/shared/components/modal-excluido/modal-excluido.component';
import { ModalUsuarioComponent } from 'src/app/shared/components/modal-usuario/modal-usuario.component';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss'],
})
export class EditUsersComponent implements OnInit, PendingChanges {
  tituloDaPagina = 'Editar Usuário';
  cadastro!: Usuario;
  form!: FormGroup | null;
  id = this.route.snapshot.paramMap.get('id') as string;
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
    this.usuarioService.getById(this.id).subscribe((usuario) => {
      this.cadastro = usuario;
      this.carregarFormulario();
      setTimeout(() => {
        this.form?.markAsPristine();
      });
    });
  }

  private carregarFormulario() {
    this.form = this.formUserService.getForm();
    this.form?.patchValue({
      "@type": this.cadastro['@type'],
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

  editarUsuario() {
    const formValue = this.form?.value;
    const tipoSelecionado: string = this.form?.value['@type'];

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

    const payload: Payload = {
      body: dadosAtualizados,
      classType: tipoSelecionado
    };

    this.form?.markAsPristine();

    this.cadastroService
      .update(this.id, payload)
      .pipe(debounceTime(500))
      .subscribe({
        next: () => {
          this.abrirModalEditar(dadosAtualizados);
        }
      });
  }

  editarNavegando() {
    this.editarUsuario();
    this.router.navigate(['/users/list']);
  }

  private excluir(idCadastro: string) {
    this.cadastroService.delete(idCadastro)
      .pipe(debounceTime(500))
      .subscribe({
        next: () => {
          this.router.navigate(['/users/list']);
        }
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

  private abrirModalEditar(usuario: Usuario) {
    this.dialog.open(ModalUsuarioComponent, {
      width: '552px',
      height: '360px',
      data: { operacao: 'Editado', nome: usuario.nome, tipo: usuario.role, email: usuario.email, senha: usuario.senha }
    });
  }

  hasUnsavedChanges(): boolean {
    return this.form ? this.form.dirty : false;
  }
}

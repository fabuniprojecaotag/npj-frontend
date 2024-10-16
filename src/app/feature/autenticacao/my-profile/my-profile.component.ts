import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { CadastroService } from 'src/app/feature/autenticacao/services/cadastro.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Payload } from 'src/app/core/types/payload';
import { PendingChanges } from 'src/app/core/types/pending-changes';
import { Usuario } from 'src/app/core/types/usuario';
import { ModalUsuarioComponent } from 'src/app/shared/components/modal-usuario/modal-usuario.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit, PendingChanges {
  tituloPagina = 'Meu Perfil';
  perfilComponente = true;
  cadastro!: Usuario;
  form!: FormGroup | null;

  constructor(
    private cadastroService: CadastroService,
    private formUserService: FormsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  carregarFormulario() {
    this.form = this.formUserService.getForm();

    this.form?.patchValue({
      '@type': this.cadastro['@type'],
      nome: this.cadastro.nome,
      matricula: this.cadastro.matricula,
      role: this.cadastro.role,
      cpf: this.cadastro.cpf,
      semestre: this.cadastro.semestre,
      status: this.cadastro.status,
      perfil: this.cadastro.role,
      email: this.cadastro.email,
      senha: null,
      unidadeInstitucional: this.cadastro.unidadeInstitucional,
    });
  }

  ngOnInit(): void {
    this.cadastroService.buscarMeuUsuario().subscribe({
      next: (user) => {
        this.cadastro = user;
        this.carregarFormulario();
        setTimeout(() => {
          this.form?.markAsPristine();
        });
      }
    });
  }

  atualizarUsuario(navegar: boolean) {
    const formValue = this.form?.value;
    const tipoSelecionado = this.form?.value['@type'];

    const senhaPresente = formValue.senha !== null && formValue.senha !== '';

    const dadosAtualizados: Usuario = {
      ...this.cadastro,
      ...formValue,
      ...(senhaPresente && { senha: formValue.senha }),
    };

    const payload: Payload = {
      body: dadosAtualizados,
      classType: tipoSelecionado
    };

    this.form?.markAsPristine();

    this.cadastroService
      .update(dadosAtualizados.email, payload)
      .pipe(debounceTime(500))
      .subscribe({
        next: () => {
          this.abrirModal(dadosAtualizados);
          if(navegar){
            this.router.navigate(['/']);
          }
        }
      });
  }

  private abrirModal(usuario: Usuario) {
    this.dialog.open(ModalUsuarioComponent, {
      width: '552px',
      height: '360px',
      data: { operacao: 'Editado', nome: usuario.nome, tipo: usuario.role, email: usuario.email, senha: usuario.senha },
    });
  }

  hasUnsavedChanges(): boolean {
    return this.form ? this.form.dirty : false;
  }
}

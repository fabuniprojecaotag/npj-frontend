import { TokenService } from 'src/app/core/services/token.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Usuario } from 'src/app/core/types/usuario';
import { FormsService } from 'src/app/core/services/forms.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalExcluidoComponent } from 'src/app/shared/modal-excluido/modal-excluido.component';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  tituloDaPagina: string = 'Editar Usuário';
  form!: FormGroup<any> | null;
  cadastro!: Usuario;
  idParam = this.route.snapshot.paramMap.get('email') as string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usuarioService: CadastroService,
    private formUserService: FormsService,
    private cadastroService: CadastroService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    const nomeUsuario = this.idParam.split('@')[0];

    this.usuarioService.buscarCadastro(nomeUsuario).subscribe(usuario => {
      this.cadastro = usuario;
      this.carregarFormulario();
    })
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
      supervisor: this.cadastro.supervisor
    });

  }

  editar() {
    const dadosAtualizados: Usuario = {
      "@type": this.form?.value.type,
      id: this.form?.value.id,
      cpf: this.form?.value.cpf,
      nome: this.form?.value.nome,
      matricula: this.form?.value.matricula,
      semestre: this.form?.value.semestre,
      role: this.form?.value.role,
      email: this.form?.value.email,
      status: this.form?.value.status,
      senha: this.form?.value.senha,
      unidadeInstitucional: this.form?.value.unidadeInstitucional,
      supervisor: this.form?.value.supervisor,
    }

    const nomeUsuario = this.idParam.split('@')[0];

    this.cadastroService.editarCadastro(dadosAtualizados, nomeUsuario).subscribe({
      next: () => {
        alert('Atualização feita com sucesso!');
        this.router.navigate(['/users']);
      },
      error: (err) => {
        alert('Erro ao atualizar usuário!');
        console.log('erro ao atualizar:', err);
      }
    })
  }

  excluir(idCadastro: string) {
    this.cadastroService.excluirCadastro(idCadastro).subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
      error: (err) => {
        alert('Erro ao excluir o usuário!\n Tente novamente mais tarde');
        console.log("Erro ao excluir:", err);
      }
    })
  }

  abrirModal(user: Usuario) {
    this.dialog.open(ModalExcluidoComponent, {
      width: '372px',
      height: '228px',
      data: { tituloCriado: 'Usuário', nome: user.nome, deletar: () => this.excluir(user.id)}
    });
  }
}


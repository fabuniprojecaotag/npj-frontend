import { TokenService } from 'src/app/core/services/token.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Usuario } from 'src/app/core/types/usuario';
import { FormsService } from 'src/app/core/services/forms.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  tituloDaPagina: string = 'Editar Usuário';
  form!: FormGroup<any> | null;
  token = '';
  cadastro!: Usuario;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usuarioService: CadastroService,
    private tokenService: TokenService,
    private formUserService: FormsService,
    private cadastroService: CadastroService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('cpf') as string;

    this.token = this.tokenService.retornarToken();
    this.usuarioService.buscarCadastro(idParam).subscribe(callback => {
      this.cadastro = callback;
      console.log("usuario para editar:", this.cadastro)
      this.carregarFormulario();
    })
  }

  carregarFormulario() {
    this.form = this.formUserService.getForm();
    this.form?.patchValue({
      nome: this.cadastro.nome,
      matricula: this.cadastro.matricula,
      semestre: this.cadastro.semestre,
      perfil: this.cadastro.role,
      email: this.cadastro.email,
      status: this.cadastro.status,
    });

  }

  editar() {
    const dadosAtualizados: Usuario = {
      "@type": this.form?.value.type,
      nome: this.form?.value.nome,
      matricula: this.form?.value.matricula,
      semestre: this.form?.value.semestre,
      role: this.form?.value.perfil,
      email: this.form?.value.email,
      status: this.form?.value.status,
      senha: this.form?.value.senha,
      unidadeInstitucional: ''
    }

    this.cadastroService.editarCadastro(dadosAtualizados, this.cadastro.email).subscribe({
      next: (response) => {
        alert('Atualização feita com sucesso!');
        this.router.navigate(['/users']);
      },
      error: (err) => {
        alert('Erro ao atualizar usuário!');
        console.log('erro ao atualizar:', err);
      }
    })
  }

  excluir () {
    this.cadastroService.excluirCadastro(this.cadastro.role).subscribe({
      next: (response) => {
        alert("Usuário excluido com sucesso");
        this.router.navigate(['/users']);
        console.log("exclusão resp:", response);
      },
      error: (err) => {
        console.log("Erro ao excluir:", err);
      }
    })
  }
}

import { TokenService } from 'src/app/core/services/token.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Usuario } from 'src/app/core/types/usuario';
import { FormUserService } from 'src/app/core/services/form-user.service';

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
    private formUserService: FormUserService,
    private cadastroService: CadastroService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('documentId') as string;

    this.token = this.tokenService.retornarToken();
    this.usuarioService.buscarCadastro(idParam).subscribe(callback => {
      this.cadastro = callback.result[0].result[0];
      console.log("usuario para editar:", this.cadastro)
      this.carregarFormulario();
    })
  }

  carregarFormulario() {
    this.form = this.formUserService.getCadastro();
    this.form?.patchValue({
      nome: this.cadastro.nome,
      matricula: this.cadastro.matricula,
      semestre: this.cadastro.semestre,
      perfil: this.cadastro.perfil.nome,
      perfil_id: this.cadastro.perfil_id,
      email: this.cadastro.email,
      status: this.cadastro.status,
    });

  }

  editar() {
    const dadosAtualizados = {
      nome: this.form?.value.nome,
      matricula: this.form?.value.matricula,
      semestre: this.form?.value.semestre,
      perfil: this.form?.value.perfil,
      perfil_id: this.form?.value.perfil_id,
      email: this.form?.value.email,
      status: this.form?.value.status,
      senha: this.form?.value.senha,
    }

    this.cadastroService.editarCadastro(dadosAtualizados).subscribe({
      next: (response) => {
        alert('Atualização feita com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('erro ao atualizar:', err);
      }
    })
  }
}

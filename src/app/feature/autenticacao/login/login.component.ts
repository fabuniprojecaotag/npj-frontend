import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/autenticacao/services/autenticacao.service';
import { UsuarioService } from '../services/usuario.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  anoAtual: number = new Date().getFullYear();
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    const isLogado = this.usuarioService.estaLogado();
    if (isLogado) {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      senha: [null, Validators.required],
    });
  }

  login() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const senha = this.loginForm.value.senha;

      this.autenticacaoService.autenticar(email, senha)
      .pipe(debounceTime(500))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      alert('Campos inválidos!');
    }
  }
}

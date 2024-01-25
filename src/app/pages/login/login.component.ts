import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  anoAtual: number = new Date().getFullYear();
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private autenticacaoService: AutenticacaoService,
  ) { }

  ngOnInit(): void {
    const userDataString = localStorage.getItem('user_data');
    const tokenString = localStorage.getItem('token');
    if (userDataString != '' && tokenString != '') {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
    });
  }

  login() {
    this.loading = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const senha = this.loginForm.value.senha;

      this.autenticacaoService.autenticar(email, senha).subscribe({
        next: (resposta) => {
          this.loading = false;
          console.log('sucesso ao logar!', resposta);
          // localStorage.setItem(
          //   'user_data',
          //   JSON.stringify(resposta.body?.user)
          // );
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading = false;
          console.log('Erro ao logar:', err);
        },
      });
    } else {
      alert('Campos invalidos!');
    }
  }
}

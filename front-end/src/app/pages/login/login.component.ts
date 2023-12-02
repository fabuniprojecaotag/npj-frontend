import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RequestService } from 'src/app/core/services/request.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UsuarioService } from 'src/app/core/services/usuario.service';
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

  constructor(private formBuilder: FormBuilder, private router: Router, private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required]
    })
  }

  // cadastrar() {
  //   this.loading = true;
  //   try {
  //     if (this.loginForm.valid) {
  //       const formData = this.loginForm.value;
  //       const postData = { login: formData.email, password: formData.senha };
  //       this.requestService
  //         .logar('auth', postData)
  //         .pipe(
  //           catchError((error) => {
  //             this.loading = false;
  //             if (error.status == '401') {
  //               alert('Dados incorretos');
  //             } else if (error.status === 0) {
  //               alert(
  //                 'A API está offline ou inacessível. Verifique sua conexão.'
  //               );
  //             }
  //             return throwError(() => error);
  //           })
  //         )
  //         .subscribe((data) => {
  //           this.loading = false;
  //           console.log('POST resposta do login:', data);
  //           if (data.nome.length > 0) {
  //             localStorage.setItem('user_data', JSON.stringify(data));
  //             this.router.navigate(['./home']);
  //           }
  //         });
  //     } else {
  //       console.log('else');
  //       this.loading = false;
  //       alert('Formulário inválido');
  //     }
  //   } catch (error: any) {
  //     this.loading = false;
  //     console.log('level - 1 error');
  //     console.log(error);
  //   }
  // }

  login() {
    this.loading = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const senha = this.loginForm.value.senha;

      this.autenticacaoService.autenticar(email, senha).subscribe({
        next: (resposta) => {
          this.loading = false;
          if (resposta.status == 200) {
            console.log('sucesso ao logar!', resposta);
            localStorage.setItem('user_data', JSON.stringify(resposta));
            this.router.navigate(['./home']);
          }
        },
        error: (err) => {
          this.loading = false;
          console.log('Erro ao logar:', err);
        }
      });
    } else {
      alert('formulário invalido!')
    }

  }

}

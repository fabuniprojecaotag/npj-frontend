import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RequestService } from 'src/app/core/services/request.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  anoAtual: number = new Date().getFullYear();
  loading: boolean = false;

  constructor(private router: Router, private requestService: RequestService) {}

  ngOnInit(): void {}

  cadastrar(form: NgForm) {
    this.loading = true;
    try {
      if (form.valid) {
        const formData = form.value;
        const postData = { login: formData.email, password: formData.senha };
        this.requestService
          .logar('auth', postData)
          .pipe(
            catchError((error) => {
              this.loading = false;
              if (error.status == '401') {
                alert('Dados incorretos');
              } else if (error.status === 0) {
                alert(
                  'A API está offline ou inacessível. Verifique sua conexão.'
                );
              }
              return throwError(() => error);
            })
          )
          .subscribe((data) => {
            this.loading = false;
            console.log('POST response:', data);
            if (data.nome.length > 0) {
              localStorage.setItem('user_data', JSON.stringify(data));
              this.router.navigate(['./home']);
            }
          });
      } else {
        console.log('else');
        this.loading = false;
        alert('Formulário inválido');
      }
    } catch (error: any) {
      this.loading = false;
      console.log('level - 1 error');
      console.log(error);
    }
  }
}

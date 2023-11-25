import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  anoAtual: number = new Date().getFullYear();

  constructor (private router: Router) {}

  ngOnInit(): void {
  }

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(["./home"]);
    } else {
      alert("Formulário inválido");
    }
    console.log(form.controls);
  }
}

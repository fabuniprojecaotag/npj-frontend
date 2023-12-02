import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  formCadastro!: FormGroup;
  @Input() perfilComponente!: boolean;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();

  constructor (private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({

    })
  }

  // função pra chamar o cadastrar ou editar
  executarAcao() {
    this.acaoClique.emit();
  }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../core/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { AtendimentoEditComponent } from './atendimento-edit/atendimento-edit.component';
import { AtendimentosRoutingModule } from './atendimentos-routing.module';
import { AtendimentosComponent } from './atendimentos.component';
import { AtendimentoAddComponent } from './novo-atendimento/atendimento-add/atendimento-add.component';
import { NovoAtendimentoComponent } from './novo-atendimento/novo-atendimento.component';

@NgModule({
  declarations: [
    NovoAtendimentoComponent,
    AtendimentoAddComponent,
    AtendimentoEditComponent,
    AtendimentosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    AtendimentosRoutingModule
  ],
  exports: [
    NovoAtendimentoComponent,
    AtendimentoAddComponent,
    AtendimentoEditComponent
  ]
})
export class AtendimentosModule { }

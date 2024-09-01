import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../core/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AssistidosRoutingModule } from './assisitidos-routing.component';
import { AssistidoAddComponent } from './assistido-add/assistido-add.component';
import { AssistidosShortcutsComponent } from './assistidos-shortcuts/assistidos-shortcuts.component';
import { ModalEditAssistidoComponent } from './assistidos-shortcuts/modal-edit-assistido/modal-edit-assistido.component';
import { AssistidosComponent } from './assistidos.component';

@NgModule({
  declarations: [
    AssistidoAddComponent,
    AssistidosComponent,
    AssistidosShortcutsComponent,
    AssistidosComponent,
    ModalEditAssistidoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    AssistidosRoutingModule
  ],
  exports: [
    AssistidoAddComponent,
    AssistidosComponent,
    AssistidosShortcutsComponent,
    AssistidosComponent,
  ]
})
export class AssistidosModule { }

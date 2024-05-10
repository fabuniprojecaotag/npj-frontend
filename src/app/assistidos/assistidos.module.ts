import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../core/material/material.module";
import { RouterModule } from "@angular/router";
import { AssistidoAddComponent } from "./assistido-add/assistido-add.component";
import { AssistidosComponent } from "./assistidos.component";
import { AssistidosShortcutsComponent } from "./assistidos-shortcuts/assistidos-shortcuts.component";
import { AssistidosRoutingModule } from "./assisitidos-routing.component";
import { AssistidosEditComponent } from "./assistidos-edit/assistidos-edit.component";

@NgModule({
  declarations: [
    AssistidoAddComponent,
    AssistidosComponent,
    AssistidosShortcutsComponent,
    AssistidosComponent,
    AssistidosEditComponent
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
    AssistidosEditComponent
  ]
})
export class AssistidosModule { }

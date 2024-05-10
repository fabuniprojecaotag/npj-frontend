import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../core/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ProcessoAddComponent } from "./processo-add/processo-add.component";
import { ProcessoEditComponent } from "./processo-edit/processo-edit.component";
import { ProcessosRoutingModule } from "./processos-routing.module";
import { ProcessosComponent } from "./processos.component";

@NgModule({
  declarations: [
    ProcessosComponent,
    ProcessoAddComponent,
    ProcessoEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    ProcessosRoutingModule
  ],
  exports: [
    ProcessosComponent,
    ProcessoAddComponent,
    ProcessoEditComponent
  ]
})

export class ProcessosModule { }

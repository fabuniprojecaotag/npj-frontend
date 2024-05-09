import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NaoEncontradaComponent } from "./nao-encontrada/nao-encontrada.component";
import { ErroRoutingModule } from "./erro-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    NaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    ErroRoutingModule,
    SharedModule
  ]
})

export class ErroModule {}

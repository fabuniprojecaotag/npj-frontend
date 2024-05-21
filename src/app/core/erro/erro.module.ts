import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NaoEncontradaComponent } from './nao-encontrada/nao-encontrada.component';
import { ErroRoutingModule } from './erro-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    ErroRoutingModule,
    SharedModule,
    RouterModule
  ]
})

export class ErroModule {}

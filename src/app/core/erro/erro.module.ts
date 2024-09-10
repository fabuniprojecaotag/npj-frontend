import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErroRoutingModule } from './erro-routing.module';
import { NaoEncontradaComponent } from './nao-encontrada/nao-encontrada.component';

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

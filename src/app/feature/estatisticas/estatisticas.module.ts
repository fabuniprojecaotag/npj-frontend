import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstatisticasComponent } from './estatisticas.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../core/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EstatisticasRoutingModule } from './estatisticas-routing.module';

@NgModule({
  declarations: [
    EstatisticasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    EstatisticasRoutingModule
  ],
  exports: [
    EstatisticasComponent
  ]
})
export class EstatisticasModule { }

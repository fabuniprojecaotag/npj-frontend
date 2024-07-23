import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MedidasAddComponent } from './medidas-add/medidas-add.component';
import { MedidasEditComponent } from './medidas-edit/medidas-edit.component';
import { MedidasRoutingModule } from './medidas-routing.module';
import { MedidasComponent } from './medidas.component';

@NgModule({
  declarations: [
    MedidasComponent,
    MedidasAddComponent,
    MedidasEditComponent
  ],
  imports: [
    CommonModule,
    MedidasRoutingModule
  ],
  exports: [
    MedidasComponent,
    MedidasAddComponent,
    MedidasEditComponent
  ]
})
export class MedidasModule { }

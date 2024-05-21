import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EstatisticasComponent } from './estatisticas.component';
import { authGuard } from '../autenticacao/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EstatisticasComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstatisticasRoutingModule { }

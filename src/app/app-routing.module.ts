import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './autenticacao/auth.guard';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule),
  },
  {
    path: 'assistidos',
    loadChildren: () => import('./assistidos/assistidos.module').then(m => m.AssistidosModule),
    canActivate: [authGuard]
  },
  {
    path: 'atendimentos',
    loadChildren: () => import('./atendimentos/atendimentos.module').then(m => m.AtendimentosModule),
    canActivate: [authGuard],
  },

  {
    path: 'processos',
    loadChildren: () => import('./processos/processos.module').then(m => m.ProcessosModule),
    canActivate: [authGuard]
  },
  {
    path: 'estatisticas',
    loadChildren: () => import('./estatisticas/estatisticas.module').then(m => m.EstatisticasModule),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'users/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/nao-encontrada',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './autenticacao/auth.guard';
import { HomeComponent } from './home/home.component';
import { roleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canLoad: [authGuard],
    canActivate: [authGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule),
  },
  {
    path: 'assistidos',
    loadChildren: () => import('./assistidos/assistidos.module').then(m => m.AssistidosModule),
    canLoad: [authGuard],
    canActivate: [authGuard]
  },
  {
    path: 'atendimentos',
    loadChildren: () => import('./atendimentos/atendimentos.module').then(m => m.AtendimentosModule),
    canLoad: [authGuard],
    canActivate: [authGuard]
  },

  {
    path: 'processos',
    loadChildren: () => import('./processos/processos.module').then(m => m.ProcessosModule),
    canLoad: [authGuard],
    canActivate: [authGuard]
  },
  {
    path: 'medidas',
    loadChildren: () => import('./medidas/medidas.module').then(m => m.MedidasModule),
    canLoad: [authGuard],
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'estatisticas',
    loadChildren: () => import('./estatisticas/estatisticas.module').then(m => m.EstatisticasModule),
    canLoad: [authGuard],
    canActivate: [authGuard]
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

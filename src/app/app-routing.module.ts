import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './feature/autenticacao/auth.guard';
import { HomeComponent } from './feature/home/home.component';
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
    loadChildren: () => import('./feature/autenticacao/autenticacao.module').then(m => m.AutenticacaoModule),
  },
  {
    path: 'assistidos',
    loadChildren: () => import('./feature/assistidos/assistidos.module').then(m => m.AssistidosModule),
    canLoad: [authGuard],
    canActivate: [authGuard]
  },
  {
    path: 'atendimentos',
    loadChildren: () => import('./feature/atendimentos/atendimentos.module').then(m => m.AtendimentosModule),
    canLoad: [authGuard],
    canActivate: [authGuard]
  },

  {
    path: 'processos',
    loadChildren: () => import('./feature/processos/processos.module').then(m => m.ProcessosModule),
    canLoad: [authGuard],
    canActivate: [authGuard]
  },
  {
    path: 'medidas',
    loadChildren: () => import('./feature/medidas/medidas.module').then(m => m.MedidasModule),
    canLoad: [authGuard],
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'estatisticas',
    loadChildren: () => import('./feature/estatisticas/estatisticas.module').then(m => m.EstatisticasModule),
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssistidoAddComponent } from './assistidos/assistido-add/assistido-add.component';
import { AssistidosEditComponent } from './assistidos/assistidos-edit/assistidos-edit.component';
import { AssistidosShortcutsComponent } from './assistidos/assistidos-shortcuts/assistidos-shortcuts.component';
import { AssistidosComponent } from './assistidos/assistidos.component';
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
    component: AssistidosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assistidos/shortcut/:cpf',
    component: AssistidosShortcutsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assistidos/add',
    component: AssistidoAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assistidos/edit/:cpf',
    component: AssistidosEditComponent,
    canActivate: [authGuard],
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
  imports: [RouterModule.forRoot(routes), HomeModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }

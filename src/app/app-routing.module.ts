import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './autenticacao/login/login.component';
import { MyProfileComponent } from './autenticacao/my-profile/my-profile.component';
import { authGuard } from './autenticacao/auth.guard';
import { AssistidosComponent } from './assistidos/assistidos.component';
import { AssistidoAddComponent } from './assistidos/assistido-add/assistido-add.component';
import { AssistidosEditComponent } from './assistidos/assistidos-edit/assistidos-edit.component';
import { AssistidosShortcutsComponent } from './assistidos/assistidos-shortcuts/assistidos-shortcuts.component';
import { AtendimentosComponent } from './atendimentos/atendimentos.component';
import { NovoAtendimentoComponent } from './atendimentos/novo-atendimento/novo-atendimento.component';
import { AtendimentoAddComponent } from './atendimentos/novo-atendimento/atendimento-add/atendimento-add.component';
import { AtendimentoEditComponent } from './atendimentos/atendimento-edit/atendimento-edit.component';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: MyProfileComponent,
    canActivate: [authGuard],
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
    component: AtendimentosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assistidos/novo-atendimento',
    component: NovoAtendimentoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assistidos/novo-atendimento/:ficha',
    component: AtendimentoAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'atendimentos/edit/:id/:ficha',
    component: AtendimentoEditComponent,
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
    redirectTo: '/users/login',
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

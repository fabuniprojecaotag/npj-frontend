import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './autenticacao/login/login.component';
import { UsersComponent } from './autenticacao/users/users.component';
import { AddUsersComponent } from './autenticacao/users/add-users/add-users.component';
import { MyProfileComponent } from './autenticacao/my-profile/my-profile.component';
import { authGuard } from './core/guards/auth.guard';
import { EditUsersComponent } from './autenticacao/users/edit-users/edit-users.component';
import { AssistidosComponent } from './assistidos/assistidos.component';
import { AssistidoAddComponent } from './assistidos/assistido-add/assistido-add.component';
import { AssistidosEditComponent } from './assistidos/assistidos-edit/assistidos-edit.component';
import { AssistidosShortcutsComponent } from './assistidos/assistidos-shortcuts/assistidos-shortcuts.component';
import { AtendimentosComponent } from './atendimentos/atendimentos.component';
import { NovoAtendimentoComponent } from './atendimentos/novo-atendimento/novo-atendimento.component';
import { ProcessosComponent } from './processos/processos.component';
import { ProcessoAddComponent } from './processos/processo-add/processo-add.component';
import { ProcessoEditComponent } from './processos/processo-edit/processo-edit.component';
import { AtendimentoAddComponent } from './atendimentos/novo-atendimento/atendimento-add/atendimento-add.component';
import { AtendimentoEditComponent } from './atendimentos/atendimento-edit/atendimento-edit.component';
import { EstatisticasComponent } from './estatisticas/estatisticas.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users/add',
    component: AddUsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users/edit/:id',
    component: EditUsersComponent,
    canActivate: [authGuard],
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
    path: 'atendimentos/edit/:id/:area',
    component: AtendimentoEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assistidos/novo-atendimento',
    component: NovoAtendimentoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assistidos/novo-atendimento/:area',
    component: AtendimentoAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'processos',
    component: ProcessosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'processos/add',
    component: ProcessoAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'processos/edit/:numero',
    component: ProcessoEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'estatisticas',
    component: EstatisticasComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/login',
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
export class AppRoutingModule {}

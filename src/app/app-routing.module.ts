import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUsersComponent } from './pages/users/add-users/add-users.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { authGuard } from './core/guards/auth.guard';
import { EditUsersComponent } from './pages/users/edit-users/edit-users.component';
import { AssistidosComponent } from './pages/assistidos/assistidos.component';
import { AssistidoAddComponent } from './pages/assistidos/assistido-add/assistido-add.component';
import { AssistidosEditComponent } from './pages/assistidos/assistidos-edit/assistidos-edit.component';
import { AssistidosShortcutsComponent } from './pages/assistidos/assistidos-shortcuts/assistidos-shortcuts.component';
import { AtendimentosComponent } from './pages/atendimentos/atendimentos.component';
import { NovoAtendimentoComponent } from './pages/atendimentos/novo-atendimento/novo-atendimento.component';
import { ProcessosComponent } from './pages/processos/processos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
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
    path: 'users/edit/:documentId',
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
    path: 'assistidos/shortcut/:documentId',
    component: AssistidosShortcutsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assistidos/add',
    component: AssistidoAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assistidos/edit/:documentId',
    component: AssistidosEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assistidos/novo-atendimento',
    component: NovoAtendimentoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'atendimentos',
    component: AtendimentosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'processos',
    component: ProcessosComponent,
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

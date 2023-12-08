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

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users/add',
    component: AddUsersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users/edit',
    component: EditUsersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: MyProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'assistidos',
    component: AssistidosComponent
  },
  {
    path: 'assistidos/adicionar',
    component: AssistidoAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

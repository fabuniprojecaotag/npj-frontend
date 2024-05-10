import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { authGuard } from "./auth.guard";
import { LoginComponent } from "./login/login.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { AddUsersComponent } from "./users/add-users/add-users.component";
import { EditUsersComponent } from "./users/edit-users/edit-users.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: 'add',
    component: AddUsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    component: EditUsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'list',
    component: UsersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: MyProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticaoRoutingModule { }

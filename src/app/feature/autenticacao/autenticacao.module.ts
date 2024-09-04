import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { MaterialModule } from '../../core/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { AutenticaoRoutingModule } from './autenticacao-routing.module';
import { UsersComponent } from './users/users.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    MyProfileComponent,
    AddUsersComponent,
    EditUsersComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    AutenticaoRoutingModule
  ],
  exports: [
    LoginComponent,
    MyProfileComponent,
    AddUsersComponent,
    EditUsersComponent,
    UsersComponent
  ]
})
export class AutenticacaoModule { }

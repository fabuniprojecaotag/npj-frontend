import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { UserMenuComponent } from './shared/user-menu/user-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { AddUsersComponent } from './pages/users/add-users/add-users.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { FormUsersComponent } from './shared/form-users/form-users.component';
import { UtilsBarComponent } from './shared/utils-bar/utils-bar.component';
import { DropdownPerfilComponent } from './shared/dropdown-perfil/dropdown-perfil.component';
import { AutenticacaoInterceptor } from './core/interceptors/autenticacao.interceptor';
import { EditUsersComponent } from './pages/users/edit-users/edit-users.component';
import { ModalCriadoComponent } from './shared/modal-criado/modal-criado.component';
import { AssistidosComponent } from './pages/assistidos/assistidos.component';
import { AssistidoAddComponent } from './pages/assistidos/assistido-add/assistido-add.component';
import { FormAssistidosComponent } from './shared/form-assistidos/form-assistidos.component';
import { PerfisComponent } from './pages/perfis/perfis.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    NavMenuComponent,
    UserMenuComponent,
    AddUsersComponent,
    MyProfileComponent,
    FormUsersComponent,
    UtilsBarComponent,
    DropdownPerfilComponent,
    EditUsersComponent,
    ModalCriadoComponent,
    AssistidosComponent,
    AssistidoAddComponent,
    FormAssistidosComponent,
    PerfisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatSelectModule,
    MatMenuModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AutenticacaoInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

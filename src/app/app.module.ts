import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './autenticacao/login/login.component';
import { UsersComponent } from './autenticacao/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddUsersComponent } from './autenticacao/users/add-users/add-users.component';
import { MyProfileComponent } from './autenticacao/my-profile/my-profile.component';
import { AutenticacaoInterceptor } from './core/interceptors/autenticacao.interceptor';
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
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AtendimentoEditComponent } from './atendimentos/atendimento-edit/atendimento-edit.component';
import { MaterialModule } from './core/material/material.module';
import { SharedModule } from './shared/shared.module';
import { ErroModule } from './core/erro/erro.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    AddUsersComponent,
    MyProfileComponent,
    EditUsersComponent,
    AssistidosComponent,
    AssistidoAddComponent,
    AssistidosEditComponent,
    AssistidosShortcutsComponent,
    NovoAtendimentoComponent,
    AtendimentosComponent,
    ProcessosComponent,
    ProcessoAddComponent,
    ProcessoEditComponent,
    AtendimentoAddComponent,
    AtendimentoEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective, NgxMaskPipe,
    ErroModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true,
    },
    provideNgxMask()
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

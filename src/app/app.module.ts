import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddUsersComponent } from './pages/users/add-users/add-users.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { AutenticacaoInterceptor } from './core/interceptors/autenticacao.interceptor';
import { EditUsersComponent } from './pages/users/edit-users/edit-users.component';
import { AssistidosComponent } from './pages/assistidos/assistidos.component';
import { AssistidoAddComponent } from './pages/assistidos/assistido-add/assistido-add.component';
import { AssistidosEditComponent } from './pages/assistidos/assistidos-edit/assistidos-edit.component';
import { AssistidosShortcutsComponent } from './pages/assistidos/assistidos-shortcuts/assistidos-shortcuts.component';
import { AtendimentosComponent } from './pages/atendimentos/atendimentos.component';
import { NovoAtendimentoComponent } from './pages/atendimentos/novo-atendimento/novo-atendimento.component';
import { ProcessosComponent } from './pages/processos/processos.component';
import { ProcessoAddComponent } from './pages/processos/processo-add/processo-add.component';
import { ProcessoEditComponent } from './pages/processos/processo-edit/processo-edit.component';
import { AtendimentoAddComponent } from './pages/atendimentos/novo-atendimento/atendimento-add/atendimento-add.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AtendimentoEditComponent } from './pages/atendimentos/atendimento-edit/atendimento-edit.component';
import { NaoEncontradaComponent } from './pages/nao-encontrada/nao-encontrada.component';
import { EstatisticasComponent } from './pages/estatisticas/estatisticas.component';
import { MaterialModule } from './core/material/material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    NaoEncontradaComponent,
    EstatisticasComponent,
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

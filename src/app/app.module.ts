import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { NavMenuComponent } from './shared/header/nav-menu/nav-menu.component';
import { UserMenuComponent } from './shared/header/user-menu/user-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import { AddUsersComponent } from './pages/users/add-users/add-users.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { FormUsersComponent } from './shared/form-users/form-users.component';
import { UtilsBarComponent } from './shared/utils-bar/utils-bar.component';
import { AutenticacaoInterceptor } from './core/interceptors/autenticacao.interceptor';
import { EditUsersComponent } from './pages/users/edit-users/edit-users.component';
import { ModalCriadoComponent } from './shared/modal-assistido/modal-criado.component';
import { AssistidosComponent } from './pages/assistidos/assistidos.component';
import { AssistidoAddComponent } from './pages/assistidos/assistido-add/assistido-add.component';
import { FormAssistidosComponent } from './shared/form-assistidos/form-assistidos.component';
import { ModalExcluidoComponent } from './shared/modal-excluido/modal-excluido.component';
import { AssistidosEditComponent } from './pages/assistidos/assistidos-edit/assistidos-edit.component';
import { AssistidosShortcutsComponent } from './pages/assistidos/assistidos-shortcuts/assistidos-shortcuts.component';
import { CardAtalhosComponent } from './shared/card-atalhos/card-atalhos.component';
import { ModalAtalhosComponent } from './shared/modal-atalhos/modal-atalhos.component';
import { FormAtendimentoCivilComponent } from './shared/form-atendimento-civil/form-atendimento-civil.component';
import { NavItemComponent } from './shared/header/nav-menu/nav-item/nav-item.component';
import { AtendimentosComponent } from './pages/atendimentos/atendimentos.component';
import { NovoAtendimentoComponent } from './pages/atendimentos/novo-atendimento/novo-atendimento.component';
import { ProcessosComponent } from './pages/processos/processos.component';
import { FormProcessoComponent } from './shared/form-processo/form-processo.component';
import { ProcessoAddComponent } from './pages/processos/processo-add/processo-add.component';
import { ProcessoEditComponent } from './pages/processos/processo-edit/processo-edit.component';
import { AtendimentoAddComponent } from './pages/atendimentos/novo-atendimento/atendimento-add/atendimento-add.component';
import { FormAtendimentoTrabalhistaComponent } from './shared/form-atendimento-trabalhista/form-atendimento-trabalhista.component';
import { FuncionarioAutocompleteComponent } from './shared/funcionario-autocomplete/funcionario-autocomplete.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './shared/customMatPaginator/CustomMatPaginator'; // Path to your custom implementation
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AssistidoAutocompleteComponent } from './shared/assistido-autocomplete/assistido-autocomplete.component';
import { ModalProcessoComponent } from './shared/modal-processo/modal-processo-criado.component';
import { ModalExcluirProcessoComponent } from './shared/modal-excluir-processo/modal-excluir-processo.component';
import { AtendimentoAutocompleteComponent } from './shared/form-processo/atendimento-autocomplete/atendimento-autocomplete.component';
import { AtendimentoEditComponent } from './pages/atendimentos/atendimento-edit/atendimento-edit.component';
import { NaoEncontradaComponent } from './pages/nao-encontrada/nao-encontrada.component';
import { CardAtendimentosComponent } from './shared/modal-atalhos/card-atendimentos/card-atendimentos.component';
import { ModalErrosComponent } from './shared/modal-erros/modal-erros.component';
import { ModalUsuarioComponent } from './shared/modal-usuario/modal-usuario.component';
import { EstatisticasComponent } from './pages/estatisticas/estatisticas.component';
import { MatChipsModule } from '@angular/material/chips';
import { PrintButtonComponent } from './shared/print-button/print-button.component';
import { CardProcessosComponent } from './shared/modal-atalhos/card-processos/card-processos.component';

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
    EditUsersComponent,
    ModalCriadoComponent,
    AssistidosComponent,
    AssistidoAddComponent,
    FormAssistidosComponent,
    ModalExcluidoComponent,
    AssistidosEditComponent,
    AssistidosShortcutsComponent,
    CardAtalhosComponent,
    ModalAtalhosComponent,
    FormAtendimentoCivilComponent,
    NovoAtendimentoComponent,
    NavItemComponent,
    AtendimentosComponent,
    ProcessosComponent,
    FormProcessoComponent,
    ProcessoAddComponent,
    ProcessoEditComponent,
    AtendimentoAddComponent,
    FormAtendimentoTrabalhistaComponent,
    FuncionarioAutocompleteComponent,
    AssistidoAutocompleteComponent,
    ModalProcessoComponent,
    ModalExcluirProcessoComponent,
    AtendimentoAutocompleteComponent,
    AtendimentoEditComponent,
    NaoEncontradaComponent,
    CardAtendimentosComponent,
    ModalErrosComponent,
    ModalUsuarioComponent,
    EstatisticasComponent,
    PrintButtonComponent,
    CardProcessosComponent,
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
    MatStepperModule,
    MatSortModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatSelectModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxMaskDirective, NgxMaskPipe,
    MatChipsModule,
    MatRadioModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true,
    },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideNgxMask()
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

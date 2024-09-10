import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MaterialModule } from '../core/material/material.module';
import { AssistidoAutocompleteComponent } from './components/assistido-autocomplete/assistido-autocomplete.component';
import { CardAtalhosComponent } from './components/card-atalhos/card-atalhos.component';
import { FormAssistidosComponent } from './components/form-assistidos/form-assistidos.component';
import { FormAtendimentoCivilComponent } from './components/form-atendimento-civil/form-atendimento-civil.component';
import { FormAtendimentoTrabalhistaComponent } from './components/form-atendimento-trabalhista/form-atendimento-trabalhista.component';
import { FormMedidasComponent } from './components/form-medidas/form-medidas.component';

import { AtendimentoAutocompleteComponent } from './components/form-processo/atendimento-autocomplete/atendimento-autocomplete.component';
import { FormProcessoComponent } from './components/form-processo/form-processo.component';
import { FormUsersComponent } from './components/form-users/form-users.component';
import { FuncionarioAutocompleteComponent } from './components/funcionario-autocomplete/funcionario-autocomplete.component';
import { ModalAssistidoComponent } from './components/modal-assistido/modal-assistido.component';
import { ModalAtendimentoComponent } from './components/modal-atendimento/modal-atendimento.component';
import { ModalErrosComponent } from './components/modal-erros/modal-erros.component';
import { ModalExcluidoComponent } from './components/modal-excluido/modal-excluido.component';
import { ModalExcluirProcessoComponent } from './components/modal-excluir-processo/modal-excluir-processo.component';
import { ModalProcessoComponent } from './components/modal-processo/modal-processo.component';
import { ModalUsuarioComponent } from './components/modal-usuario/modal-usuario.component';
import { PrintButtonComponent } from './components/print-button/print-button.component';
import { HeaderComponent } from './components/header/header.component';
import { NavItemComponent } from './components/header/nav-menu/nav-item/nav-item.component';
import { NavMenuComponent } from './components/header/nav-menu/nav-menu.component';
import { UserMenuComponent } from './components/header/user-menu/user-menu.component';
import { CardAtendimentosComponent } from './components/modal-atalhos/card-atendimentos/card-atendimentos.component';
import { CardProcessosComponent } from './components/modal-atalhos/card-processos/card-processos.component';
import { ModalAtalhosComponent } from './components/modal-atalhos/modal-atalhos.component';
import { UtilsBarComponent } from './components/utils-bar/utils-bar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavMenuComponent,
    UserMenuComponent,
    FormUsersComponent,
    UtilsBarComponent,
    ModalAssistidoComponent,
    FormAssistidosComponent,
    ModalExcluidoComponent,
    CardAtalhosComponent,
    ModalAtalhosComponent,
    FormAtendimentoCivilComponent,
    FormAtendimentoTrabalhistaComponent,
    NavItemComponent,
    FormProcessoComponent,
    FuncionarioAutocompleteComponent,
    AssistidoAutocompleteComponent,
    ModalProcessoComponent,
    ModalExcluirProcessoComponent,
    AtendimentoAutocompleteComponent,
    CardAtendimentosComponent,
    ModalErrosComponent,
    ModalUsuarioComponent,
    PrintButtonComponent,
    CardProcessosComponent,
    ModalAtendimentoComponent,
    FormMedidasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskDirective, NgxMaskPipe,
  ],
  exports: [
    HeaderComponent,
    NavMenuComponent,
    UserMenuComponent,
    FormUsersComponent,
    UtilsBarComponent,
    ModalAssistidoComponent,
    FormAssistidosComponent,
    ModalExcluidoComponent,
    CardAtalhosComponent,
    ModalAtalhosComponent,
    FormAtendimentoCivilComponent,
    FormAtendimentoTrabalhistaComponent,
    NavItemComponent,
    FormProcessoComponent,
    FuncionarioAutocompleteComponent,
    AssistidoAutocompleteComponent,
    ModalProcessoComponent,
    ModalExcluirProcessoComponent,
    AtendimentoAutocompleteComponent,
    CardAtendimentosComponent,
    ModalErrosComponent,
    ModalUsuarioComponent,
    PrintButtonComponent,
    CardProcessosComponent,
    ModalAtendimentoComponent,
    FormMedidasComponent
  ],
  providers: [
    provideNgxMask()
  ]
})

export class SharedModule { }

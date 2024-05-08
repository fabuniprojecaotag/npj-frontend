import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header/header.component";
import { NavMenuComponent } from "./header/nav-menu/nav-menu.component";
import { UserMenuComponent } from "./header/user-menu/user-menu.component";
import { FormUsersComponent } from "./form-users/form-users.component";
import { UtilsBarComponent } from "./utils-bar/utils-bar.component";
import { AssistidoAutocompleteComponent } from "./assistido-autocomplete/assistido-autocomplete.component";
import { CardAtalhosComponent } from "./card-atalhos/card-atalhos.component";
import { FormAssistidosComponent } from "./form-assistidos/form-assistidos.component";
import { FormAtendimentoCivilComponent } from "./form-atendimento-civil/form-atendimento-civil.component";
import { FormAtendimentoTrabalhistaComponent } from "./form-atendimento-trabalhista/form-atendimento-trabalhista.component";
import { AtendimentoAutocompleteComponent } from "./form-processo/atendimento-autocomplete/atendimento-autocomplete.component";
import { FormProcessoComponent } from "./form-processo/form-processo.component";
import { FuncionarioAutocompleteComponent } from "./funcionario-autocomplete/funcionario-autocomplete.component";
import { NavItemComponent } from "./header/nav-menu/nav-item/nav-item.component";
import { ModalAssistidoComponent } from "./modal-assistido/modal-assistido.component";
import { ModalAtalhosComponent } from "./modal-atalhos/modal-atalhos.component";
import { ModalExcluidoComponent } from "./modal-excluido/modal-excluido.component";
import { ModalExcluirProcessoComponent } from "./modal-excluir-processo/modal-excluir-processo.component";
import { ModalProcessoComponent } from "./modal-processo/modal-processo-criado.component";
import { CardAtendimentosComponent } from "./modal-atalhos/card-atendimentos/card-atendimentos.component";
import { CardProcessosComponent } from "./modal-atalhos/card-processos/card-processos.component";
import { ModalErrosComponent } from "./modal-erros/modal-erros.component";
import { ModalUsuarioComponent } from "./modal-usuario/modal-usuario.component";
import { PrintButtonComponent } from "./print-button/print-button.component";
import { MaterialModule } from "../core/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

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
    NavItemComponent,
    FormProcessoComponent,
    FormAtendimentoTrabalhistaComponent,
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
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
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
    NavItemComponent,
    FormProcessoComponent,
    FormAtendimentoTrabalhistaComponent,
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
  ],
  providers: [
    provideNgxMask()
  ]
})

export class SharedModule { }

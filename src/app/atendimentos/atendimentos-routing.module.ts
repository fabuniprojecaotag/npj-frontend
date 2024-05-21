import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "../autenticacao/auth.guard";
import { AtendimentoEditComponent } from "./atendimento-edit/atendimento-edit.component";
import { AtendimentoAddComponent } from "./novo-atendimento/atendimento-add/atendimento-add.component";
import { NovoAtendimentoComponent } from "./novo-atendimento/novo-atendimento.component";
import { AtendimentosComponent } from "./atendimentos.component";

const routes: Routes = [
  {
    path: 'list',
    component: AtendimentosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'novo-atendimento',
    component: NovoAtendimentoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add/:ficha',
    component: AtendimentoAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id/:ficha',
    component: AtendimentoEditComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtendimentosRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "../autenticacao/auth.guard";
import { AssistidoAddComponent } from "./assistido-add/assistido-add.component";
import { AssistidosShortcutsComponent } from "./assistidos-shortcuts/assistidos-shortcuts.component";
import { AssistidosComponent } from "./assistidos.component";

const routes: Routes = [
  {
    path: 'list',
    component: AssistidosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'shortcut/:cpf',
    component: AssistidosShortcutsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add',
    component: AssistidoAddComponent,
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistidosRoutingModule { }

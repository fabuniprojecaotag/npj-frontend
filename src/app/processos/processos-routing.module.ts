import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { authGuard } from "../autenticacao/auth.guard";
import { ProcessoAddComponent } from "./processo-add/processo-add.component";
import { ProcessoEditComponent } from "./processo-edit/processo-edit.component";
import { ProcessosComponent } from "./processos.component";

const routes: Routes = [
  {
    path: 'list',
    component: ProcessosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add',
    component: ProcessoAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit/:numero',
    component: ProcessoEditComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProcessosRoutingModule { }

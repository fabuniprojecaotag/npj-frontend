import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedidasComponent } from './medidas.component';
import { MedidasAddComponent } from './medidas-add/medidas-add.component';
import { MedidasEditComponent } from './medidas-edit/medidas-edit.component';
import { pendingChangesGuard } from '../core/guards/pending-changes.guard';

const routes: Routes = [
  {
    path: 'list',
    component: MedidasComponent,
  },
  {
    path: 'add/:id',
    component: MedidasAddComponent,
  },
  {
    path: 'edit/:id',
    component: MedidasEditComponent,
    canDeactivate: [pendingChangesGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedidasRoutingModule { }

import { CanDeactivateFn } from '@angular/router';
import { PendingChanges } from '../types/pending-changes';

export const pendingChangesGuard: CanDeactivateFn<PendingChanges> = (component: PendingChanges) => {
  if (component.hasUnsavedChanges()) {
    return window.confirm('Você possui alterações não salvas. Tem certeza que deseja sair?');
  }
  return true;
};

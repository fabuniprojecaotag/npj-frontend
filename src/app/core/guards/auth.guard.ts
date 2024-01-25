import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

export const authGuard = () => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.estaLogado()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

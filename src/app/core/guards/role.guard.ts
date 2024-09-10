import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/feature/autenticacao/services/usuario.service';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, catchError, of } from 'rxjs';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  return usuarioService.retornarTokenUsuario().pipe(
    map((usuario) => {
      if (usuario && ['ADMINISTRADOR', 'COORDENADOR'].includes(usuario.role)) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/users/login']);
      return of(false);
    })
  );
};

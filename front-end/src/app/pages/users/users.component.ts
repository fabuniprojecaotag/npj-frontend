import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  tituloDaPagina: string = 'Usuários';
  listaUsuarios: Usuario[] = [];
  displayedColumns: string[] = ['matricula', 'nome', 'tipo', 'semestre', 'status'];
  paginaAtual: number = 0;
  filtro: string = '';

  constructor (private service: UsuarioService) {}

  ngOnInit(): void {
    // this.service.listar(this.paginaAtual, this.filtro).subscribe((listaUsuarios) => {
    //   this.listaUsuarios = listaUsuarios
    // })
  }

  getTipoUsuario(perfilId: number): string {
    switch (perfilId) {
      case 1: return 'Administrador';
      case 2: return 'Coordenador';
      case 3: return 'Secretária';
      case 4: return 'Professor';
      case 5: return 'Estagiário';
      default: return 'Desconhecido';
    }
  }

  // dica do gpt daora pro back
  toggleStatus(usuario: Usuario): void {
    usuario.status = usuario.status === 'Ativo' ? 'Inativo' : 'Ativo';
    // Você também pode chamar o serviço para salvar a alteração no status no backend, se necessário
    // this.service.atualizarStatus(usuario.id, usuario.status).subscribe(/* ... */);
  }
}

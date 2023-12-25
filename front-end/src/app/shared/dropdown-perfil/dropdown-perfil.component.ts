import { Observable, map, startWith } from 'rxjs';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Perfil } from 'src/app/core/types/usuario';
import { PerfilService } from 'src/app/core/services/perfil.service';

@Component({
  selector: 'app-dropdown-perfil',
  templateUrl: './dropdown-perfil.component.html',
  styleUrls: ['./dropdown-perfil.component.scss'],
})
export class DropdownPerfilComponent {
  @Input() label: string = '';
  @Input() iconePrefixo: string = '';
  @Input() control!: FormControl;

  usuarioTipos: Perfil[] = [];

  constructor(private perfilTipoService: PerfilService) {}

  ngOnInit(): void {
    this.perfilTipoService.listar().subscribe((dados) => {
      this.usuarioTipos = dados;
      console.log('tipos de usuario:', this.usuarioTipos);
    });
  }
}

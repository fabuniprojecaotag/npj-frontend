import { Observable, map, startWith } from 'rxjs';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Perfil } from 'src/app/core/types/usuario';
import { PerfilService } from 'src/app/core/services/perfil.service';

@Component({
  selector: 'app-dropdown-perfil',
  templateUrl: './dropdown-perfil.component.html',
  styleUrls: ['./dropdown-perfil.component.scss']
})
export class DropdownPerfilComponent {
  @Input() label: string = '';
  @Input() iconePrefixo: string = '';
  @Input() control!: FormControl;

  usuarioTipos: Perfil[] = [];

  filteredOptions$?: Observable<Perfil[]>;


  constructor(private perfilTipoService: PerfilService) { }

  ngOnInit(): void {
    this.perfilTipoService.listar()
      .subscribe(dados => {
        this.usuarioTipos = dados
        console.log('tipos de usuario:', this.usuarioTipos)
      })
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarPerfis(value))
    )
  }

  filtrarPerfis(value: string | Perfil): Perfil[] {
    const nomePerfil = typeof value === 'string' ? value : value?.nome;
    const valorFiltrado = nomePerfil?.toLowerCase();
    const result = this.usuarioTipos.filter(
      perfil => perfil.nome.toLowerCase().includes(valorFiltrado)
    )
    return result;
  }

  displayFn(perfil: Perfil): string {
    return perfil && perfil.nome ? perfil.nome : '';
  }
}

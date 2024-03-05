import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown-perfil',
  templateUrl: './dropdown-perfil.component.html',
  styleUrls: ['./dropdown-perfil.component.scss'],
})
export class DropdownPerfilComponent {
  @Input() label: string = '';
  @Input() iconePrefixo: string = '';
  @Input() control!: FormControl;

  usuarioTipos!: string;

  constructor(private cadastroService: CadastroService) {}

  ngOnInit(): void {
    this.cadastroService.buscarMeuUsuario().subscribe((dados) => {
      this.usuarioTipos = dados.role;
      console.log('tipos de usuario:', this.usuarioTipos);
    });
  }
}

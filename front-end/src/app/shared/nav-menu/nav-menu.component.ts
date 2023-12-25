import { Component, Input, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { Permissoes } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  @Input() isMenuAtivo: boolean = false;
  panelOpenState = false;

  private userData: any;
  public moduloPermissoes!: Permissoes[];

  constructor(
    private perfilService: PerfilService,
  ) {}

  ngOnInit() {
    this.loadDataFromLocalStorage();
  }

  loadDataFromLocalStorage(): void {
    const userDataString = localStorage.getItem('user_data');
    // console.log('Pegando a data:', userDataString);
    if (userDataString) {
      console.log(JSON.parse(userDataString));
      this.userData = JSON.parse(userDataString);
      this.moduloPermissoes = this.userData.perfil.permissoes;
      console.log(this.moduloPermissoes);
      this.loadPerfis();
    } else {
      this.userData = null;
    }
  }

  loadPerfis() {
    this.perfilService.consultar(this.userData.perfil.documentId).subscribe({
      next: (data) => {
        console.log('Perfil do Usuário do Menu:', data);
        this.moduloPermissoes = data.permissoes;
      },
      error: (err) => {
        console.log('Erro ao carregar perfil:', err);
      }
    });
  }
}

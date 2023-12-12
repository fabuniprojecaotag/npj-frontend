import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/core/services/request.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PerfilService } from 'src/app/core/services/perfil.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  @Input() isMenuAtivo: boolean = false;
  panelOpenState = false;

  private userData: any;
  public permissoes: any;

  constructor(
    private perfilService: PerfilService,
    // private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDataFromLocalStorage();
  }

  loadDataFromLocalStorage(): void {
    const userDataString = localStorage.getItem('user_data');
    // console.log('Pegando a data:', userDataString);
    if (userDataString) {
      // console.log(JSON.parse(userDataString));
      this.userData = JSON.parse(userDataString);
      this.permissoes = this.userData.perfil.permissoes;
      // console.log(this.permissoes);
      this.loadPerfis();
    } else {
      this.userData = null;
    }
    // this.cdr.detectChanges();
  }

  loadPerfis() {
    this.perfilService.consultar(this.userData.perfil_id).subscribe({
      next: (data) => {
        console.log('Perfil do Usuário do Menu:', data);
        this.permissoes = data.result[0].permissoes;
      },
      error: (err) => {
        console.log('Erro ao carregar perfil:', err);
      }
    });
  }
}

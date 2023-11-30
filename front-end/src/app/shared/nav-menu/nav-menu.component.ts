import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/core/services/request.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    private requestService: RequestService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDataFromLocalStorage();
    this.loadPerfis();
  }

  loadDataFromLocalStorage(): void {
    console.log('getting local');
    const userDataString = localStorage.getItem('user_data');
    console.log(userDataString);
    if (userDataString) {
      console.log(JSON.parse(userDataString));
      this.userData = JSON.parse(userDataString);
      this.permissoes = this.userData.perfil.permissoes;
      console.log(this.permissoes);
    } else {
      this.userData = null;
    }
    this.cdr.detectChanges();
  }

  loadPerfis() {
    this.requestService
      .get('perfil/' + this.userData.perfil_id)
      .pipe(
        catchError((error) => {
          if (error.status == '401') {
            alert('Dados incorretos');
          } else if (error.status === 0) {
            alert('A API está offline ou inacessível. Verifique sua conexão.');
          }
          return throwError(() => error);
        })
      )
      .subscribe((data) => {
        console.log('POST response:', data);
        this.permissoes = data.permissoes;
      });
  }
}

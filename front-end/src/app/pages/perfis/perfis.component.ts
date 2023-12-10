import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as devEnv } from 'src/environments/environment.development';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrls: ['./perfis.component.scss'],
})
export class PerfisComponent {
  private apiUrl = devEnv.devAPI;
  tituloDaPagina: string = 'Perfis';
  endpoint: string = '/perfil/all';
  data: any[] = [];
  colunasMostradas: string[] = ['nome', 'permissoes'];
  selection = new SelectionModel<any>(true, []);
  paginaAtual: number = 0;
  filtro: string = '';

  constructor(private http: HttpClient) {} // private service: UsuarioService

  ngOnInit(): void {
    this.getData().subscribe(
      (resultado) => {
        console.log('Resultado');
        console.log(resultado);
        this.data = resultado.result;
      },
      (error) => {
        console.log('Aconteceu um erro');
        console.log(error);
      }
    );
  }

  getData(): Observable<any> {
    // Set the headers with the Authorization token

    const userDataString = localStorage.getItem('user_data');
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Make the GET request with the headers
    return this.http.get(`${this.apiUrl}${this.endpoint}`, { headers });
  }

  /** Ve se tudo ta selecionado (do exemplo do material) */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selecionar tudo (do exemplo do material) */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach((row) => this.selection.select(row));
  }
}

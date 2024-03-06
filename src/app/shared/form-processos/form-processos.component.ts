import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable,startWith,map,of } from 'rxjs';
import { FormProcessosService } from 'src/app/core/services/form-processos.service';
import { Atendimento } from 'src/app/core/types/atendimento';
import { isNull,formatDate } from 'src/app/utils/functios.service';

@Component({
  selector: 'app-form-processos',
  templateUrl: './form-processos.component.html',
  styleUrls: ['./form-processos.component.scss']
})
export class FormProcessosComponent implements OnInit{

  formProcessos!: FormGroup;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  @Output() cliqueExcluir: EventEmitter<any> = new EventEmitter<any>();

  isNull = isNull;
  formatDate = formatDate;

  filteredOptions: Observable<Atendimento[]>;
  listAtendimentos: Atendimento[] = [];

  
  constructor(private formBuilder: FormBuilder, private formProcessosService: FormProcessosService) {

    this.formProcessos = this.formBuilder.group({
      numero: [null, Validators.required],
      nome: [null, Validators.required],
      dataDistribuicao: null,
      vara: null,
      forum: null,
      atendimentoId: null, 
      status: null,
    });
    this.formProcessosService.setCadastro(this.formProcessos); 

    this.filteredOptions = this.formProcessos.get('atendimentoId')?.valueChanges
    ?.pipe(
      startWith(''),
      map(value => this._filter(value))
    ) || of([]);
   }
  
    ngOnInit(): void {
      this.formProcessosService.getAtendimentos().subscribe({
        next: (response) => {
          this.listAtendimentos = response;
          this.listAtendimentos.forEach((processo:any) => {
            Object.keys(processo).forEach((key) => {
              if(/^\d{4}-\d{2}-\d{2}$/.test(processo[key])){
                processo[key] = formatDate(processo[key]);
              }else{
                processo[key] = isNull(processo[key]);
              }
            });
          });
          console.log("lista de processos:", response);
        },
        error: (err) => {
          console.log("erro ao coletar lista de processos:", err);
        }
      });
    }
    
statusList = [
  {value: '1', label: 'Ativo'},
  {value: '2', label: 'Arquivado'},
]

private _filter(value: string): Atendimento[] {
  const filterValue = value.toLowerCase();
  return this.listAtendimentos.filter(option => option?.id.toLowerCase().includes(filterValue));
}

selectedFile: any = null;

onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

}
 // cadastro ou edição de processos
 executarAcao () {
  const dataDistribuicao = this.formProcessos.get('dataDistribuicao')?.value;
    if (dataDistribuicao) {
      const formattedDate = formatDate(dataDistribuicao, true);
      this.formProcessos.get('dataDistribuicao')?.setValue(formattedDate);
    }
  this.acaoClique.emit();
}

excluir () {
  this.cliqueExcluir.emit();
}

}

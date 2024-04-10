import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/core/services/forms.service';
import { ProcessosService } from 'src/app/core/services/processos.service';
import { Processo } from 'src/app/core/types/processo';

@Component({
  selector: 'app-processo-edit',
  templateUrl: './processo-edit.component.html',
  styleUrls: ['./processo-edit.component.scss'],
})
export class ProcessoEditComponent implements OnInit {
  tituloPagina = 'Editar Processo';
  idParam!: string;
  processo!: Processo;
  form!: FormGroup<any> | null;

  constructor(
    private processsoService: ProcessosService,
    private formService: FormsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('numero') as string;
    this.processsoService.consultarProcesso(this.idParam).subscribe(callback=>{
      this.processo = callback;
      console.log(this.processo);
      this.carregarFormulario();
    });
  }

  carregarFormulario() {
    this.form = this.formService.getForm();
    this.form?.patchValue({
      numero: this.processo.numero,
      nome: this.processo.nome,
      dataDistribuicao: this.processo.dataDistribuicao,
      vara: this.processo.vara,
      forum: this.processo.forum,
      atendimentoId: this.processo.atendimentoId
     });
  }

  editarProcesso() {
    console.log("editar processo!");
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsService } from 'src/app/core/services/forms.service';
import { ProcessosService } from 'src/app/core/services/processos.service';
import { Processo } from 'src/app/core/types/processo';
import { ModalExcluirProcessoComponent } from 'src/app/shared/modal-excluir-processo/modal-excluir-processo.component';

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
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
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
      dataDistribuicao: new Date(this.processo.dataDistribuicao),
      vara: this.processo.vara,
      forum: this.processo.forum,
      atendimentoId: this.processo.atendimentoId
     });
  }

  editarProcesso() {
    const dadosAtualizados: Processo = {
      //numero :this.form?.value.numero, não enviar CPF, pois ocorrera conflito entre documentId e CPF 
      nome:this.form?.value.nome,
      dataDistribuicao:this.form?.value.dataDistribuicao,
      vara:this.form?.value.vara,
      forum:this.form?.value.forum,
      atendimentoId:this.form?.value.atendimentoId
    }
    this.processsoService.editarProcesso(this.idParam, dadosAtualizados).subscribe({
      next: ()=> {
        this.router.navigate(['/processos'])
      },
      error: (err) => {
        alert("Erro ao editar processo!");
        console.log(err)
      }
    }) 
  }

  excluirProcesso(idProcesso: string) {
    this.processsoService.excluirProcesso(idProcesso).subscribe({
      next: ()=> {
        this.router.navigate(['/processos'])
      },
      error: (err) => {
        alert("Erro ao excluir processo!");
        console.log(err)
      }
    });
  }

  abrirModal() {
    this.dialog.open(ModalExcluirProcessoComponent, {
      width: '372px',
      height: '228px',
      data: { numero: this.processo.numero,  deletar: () => this.excluirProcesso(this.idParam) }
    });
  }
}

import { FormsService } from 'src/app/core/services/forms.service';
import { Component } from '@angular/core';
import { Medida } from 'src/app/core/types/medida';
import { MedidasService } from '../service/medidas.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-medidas-add',
  templateUrl: './medidas-add.component.html',
  styleUrls: ['./medidas-add.component.scss'],
})
export class MedidasAddComponent {
  tituloPagina = 'Nova Medida Jurídica';

  constructor(
    private formService: FormsService,
    private medidasService: MedidasService,
    private router: Router
  ) { }

  private emitSucessAlert(): void {
    alert('Medida Jurídica cadastrada com sucesso.');
  }

  inserir() {
    const form = this.formService.getForm();

    if (form?.valid) {
      const novaMedida = form.getRawValue() as Medida;
      this.medidasService.save(novaMedida)
        .pipe(debounceTime(500))
        .subscribe({
          next: () => {
            this.emitSucessAlert();
            window.location.reload();
          },
        });
    }
  }

  inserirEPermanecer() {
    const form = this.formService.getForm();

    if (form?.valid) {
      const novaMedida = form.getRawValue() as Medida;

      this.medidasService.save(novaMedida)
        .pipe(debounceTime(500))
        .subscribe({
          next: () => {
            this.emitSucessAlert();
            // TODO: Chamar serviço ou método que recupera o registro criado e atualiza a URL para o registro criado
          }
        });
    }
  }

  submeter() {
    this.inserirEPermanecer();
    this.router.navigate(['/medidas/list']);
  }
}

import { Injectable } from '@angular/core';
import { CadastroService } from '../autenticacao/services/cadastro.service';
import { ProcessosService } from '../processos/services/processos.service';
import { AssistidosService } from '../assistidos/services/assistidos.service';
import { AtendimentosService } from '../atendimentos/services/atendimentos.service';
import { MedidasService } from '../medidas/service/medidas.service';

@Injectable({
  providedIn: 'root'
})
export class CacheHandlerService {

  constructor(
    private assistidoService: AssistidosService,
    private atendimentoService: AtendimentosService,
    private medidaService: MedidasService,
    private processoService: ProcessosService,
    private usuarioService: CadastroService
  ) {}

  clearAllCaches() {
    this.assistidoService.clearCache();
    this.atendimentoService.clearCache();
    this.medidaService.clearCache();
    this.processoService.clearCache();
    this.usuarioService.clearCache();
  }
}

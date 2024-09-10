import { Injectable } from '@angular/core';
import { AssistidosService } from '../../feature/assistidos/services/assistidos.service';
import { AtendimentosService } from '../../feature/atendimentos/services/atendimentos.service';
import { CadastroService } from '../../feature/autenticacao/services/cadastro.service';
import { MedidasService } from '../../feature/medidas/service/medidas.service';
import { ProcessosService } from '../../feature/processos/services/processos.service';

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

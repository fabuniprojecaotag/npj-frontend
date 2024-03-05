export interface Atendimento {
    id: string | null;
    status: string;
    area: string;
    instante: {
      seconds: number;
      nanos: number;
    };
    prazoEntregaDocumentos: string;
    historico: string;
    assistidoId: string;
    ficha: {
      type: string;
      assinatura: string | null;
      dadosSensiveis: boolean;
      testemunhas: any[] | null; 
      medidaJudicial: any | null;
      parteContraria: any | null;
    };
  }
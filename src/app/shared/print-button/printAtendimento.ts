import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export async function generatePdf(data: any, pageName: any) {

  function buildTestemunhasSection(testemunhas: any[]) {
    const table = [{
      table: {
        widths: ['*', '*', '*'],
        body: testemunhas && testemunhas.length > 0 ? testemunhas.map((t: any) => {
          return [{ text: `Nome:\n${t.nome}` }, { text: `Qualificação:\n${isNull(t.qualificacao)}` }, { text: `Endereço:\n${isNull(`${t.endereco.cep} / ${t.endereco.logradouro} - ${t.endereco.numero}\n${t.endereco.complemento}`)}` }];
        }) : [[{ text: 'Este atendimento não possui testemunhas', colSpan: 3, alignment: 'center', bold: true, margin: [12, 12, 12, 12] }, '', '']]
      }, colSpan: 2
    }, ''];

    return table;
  }
  function buildHistoricoSection(historico: any[]) {
    const his = historico;
    historico.unshift({ title: 'header' });
    const table = [{
      table: {
        widths: ['*', '*', '*'],
        body: his && his.length > 1 ? historico.map((h: any) => {
          if (h.title === 'header' && his.length > 1) {
            return [{ text: 'Histórico', colSpan: 3, style: 'tableHeader' }, '', ''];
          } else {
            return [{ text: `Título:\n${h.titulo}` }, { text: `Descrição:\n${isNull(h.descricao)}` }, { text: `Data da ação:\n${new Date(h.instante).toLocaleDateString()} - ${new Date(h.instante).toLocaleTimeString()}\nCriado por: ${h.criadoPor.nome}` }];
          }
        }) : [[{ text: 'Histórico', colSpan: 3, style: 'tableHeader' }, '', ''], [{ text: 'Este atendimento não possui nenhum registro no histórico', colSpan: 3, alignment: 'center', bold: true, margin: [12, 12, 12, 12] }, '', '']]
      }, colSpan: 2
    }, ''];

    return table;
  }
  function buildEnvolvidosSection(envolvidos: any) {

    const table: any = [{
      table: {
        widths: ['*', '*', '*'],
        body: [
          [{ text: 'Envolvidos', colSpan: 3, style: 'tableHeader', border: [1, 0, 1, 1] }, '', ''],
          [{ text: 'Assistido(a)', margin: [10, 10, 10, 10] }, { text: `${envolvidos.assistido.nome}  -  ${envolvidos.assistido.id}`, colSpan: 2, margin: [10, 10, 10, 10] }, ''],
          [{ text: 'Secretário(a)', margin: [10, 10, 10, 10] }, { text: `${envolvidos.secretaria.nome}  -  ${envolvidos.secretaria.id}`, colSpan: 2, margin: [10, 10, 10, 10] }, ''],
          [{ text: 'Estagiário(a)', margin: [10, 10, 10, 10] }, { text: `${envolvidos.estagiario.nome}  -  ${envolvidos.estagiario.id}`, colSpan: 2, margin: [10, 10, 10, 10] }, ''],
          [{ text: 'Professor(a)', margin: [10, 10, 10, 10] }, { text: `${envolvidos.professor.nome}  -  ${envolvidos.professor.id}`, colSpan: 2, margin: [10, 10, 10, 10] }, '']
        ],

      }, colSpan: 2
    }, ''];

    return table;
  }

  function getCurrentFormat(format: string) {

    const formatList: any = {
      'formatDate': formatDate
    };

    return formatList[format];
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function isNull(value: string | null | undefined) {
    if (typeof value === 'boolean') {
      return value ? 'Sim' : 'Não';
    }
    if (value === null || value === undefined || value == ' /  - \n' || value == '') {
      return 'N/A';
    }
    return value;

  }
  try {

    if (pageName === 'Atendimento Civil') {

      const docDefinition: any = {
        info: {
          title: ` Atendimento - ${data.id}`,
          author: 'GPRO',
          subject: `Relatorio de ${pageName}`,
          keywords: `relatorio,${pageName}`,
        },
        pageMargins: [10, 20, 10, 20],
        content: [
          { text: `${pageName} - ${data.id}`, style: 'header' },
          { text: 'Área: Civil', style: 'subheader' },
          { text: `Status: ${data.status}`, style: 'subheader' },
          {
            style: 'tableExample',
            table: {
              widths: ['*', '*'],
              body: [
                [{ text: 'Medida Jurídica', colSpan: 2, style: 'tableHeader' }, ''],
                [{ text: `\n${data.ficha.medidaJuridica}`, colSpan: 2 }, ''],
                [{ text: 'Testemunhas', colSpan: 2, style: 'tableHeader' }, ''],
                buildTestemunhasSection(data.ficha.testemunhas),
                [{ text: 'Parte Contrária:', colSpan: 2, style: 'tableHeader' }, ''],
                [`Nome:\n${data.ficha.parteContraria.nome}`, `Qualificação:\n${data.ficha.parteContraria.qualificacao}`],
                [{ text: `Informações Complementares:\n${data.ficha.parteContraria.informacoesComplementares}`, colSpan: 2 }, '']
              ]
            }
          },
          buildHistoricoSection(data.historico),
          buildEnvolvidosSection(data.envolvidos),
          {
            table: {
              widths: ['*', '*'],
              body: [
                [{ text: '\n\n\n_____________________________', alignment: 'center' },
                  { text: '\n\n\n_____________________________', alignment: 'center' }],
                [{ text: ' \t\t\t\t\t\tAssinatura do atendente', preserveLeadingSpaces: true, border: [false, false, false, false] }, { text: ' \t\t\t\t\t\tAssinatura do assistido', preserveLeadingSpaces: true, border: [false, false, false, false] }],
              ]
            },
            layout: {
              hLineWidth: function (i: any, node: any) {
                return (i === 2) ? 1 : 0;
              },
              vLineWidth: function (i: any, node: any) {
                return 0;
              }
            }
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5],

          },
          subtitle: {
            bold: true,
            fillColor: '#e0dede'
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            alignment: 'center', margin: [5, 5, 5, 5], fillColor: '#d1cfcf', bold: true
          }
        }
      };

      pdfMake.createPdf(docDefinition).open();
    }

    if (pageName === 'Atendimento Trabalhista') {

      const docDefinition: any = {
        info: {
          title: ` Atendimento - ${data.id}`,
          author: 'GPRO',
          subject: `Relatorio de ${pageName}`,
          keywords: `relatorio,${pageName}`,
        },
        pageMargins: [10, 20, 10, 20],
        content: [
          { text: `${pageName} - ${data.id}`, style: 'header' },
          { text: 'Área: Trabalhista', style: 'subheader' },
          { text: `Status: ${data.status}`, style: 'subheader' },
          {
            style: 'tableExample',
            table: {
              widths: ['*', '*'],
              body: [
                [{ text: 'Medida Jurídica', colSpan: 2, style: 'tableHeader' }, ''],
                [{ text: `\n${data.ficha.medidaJuridica}`, colSpan: 2 }, ''],
                [{ text: 'Testemunhas', colSpan: 2, style: 'tableHeader' }, ''],
                buildTestemunhasSection(data.ficha.testemunhas),
                [{ text: 'Reclamado', colSpan: 2, style: 'tableHeader' }, ''],
                [`Nome:\n${data.ficha.reclamado.nome}`, `Qualificação:\n${data.ficha.reclamado.tipoPessoa}`],
                [{ text: `Informações Complementares:\n${data.ficha.reclamado.numCadastro}`, colSpan: 2 }, ''],
                [{ text: `Endereço:\n${isNull(`${data.ficha.reclamado.endereco.cep} / ${data.ficha.reclamado.endereco.logradouro} - ${data.ficha.reclamado.endereco.numero}\n${data.ficha.reclamado.endereco.complemento}`)}`, colSpan: 2 }, ''],
                [{ text: 'Relação Empregaticia', colSpan: 2, style: 'tableHeader' }, ''],
                [{ text: `Data Admissão:\n${isNull(data.ficha.relacaoEmpregaticia.dataAdmissao)}` }, { text: `Valor do Sálario Anotado na CTPS:\n${isNull(data.ficha.relacaoEmpregaticia.valorSalarioCtps)}` }],
                [{ text: `Data Saída:\n${isNull(data.ficha.relacaoEmpregaticia.dataSaida)}`, }, { text: `Função Exercida:\n${isNull(data.ficha.relacaoEmpregaticia.funcaoExercida)}`, }],
                [{ text: `Sálario Anotado na CTPS?\n${isNull(data.ficha.relacaoEmpregaticia.salarioAnotadoCtps)}` }, { text: `A CTPS foi assinada corretamente?\n${isNull(data.ficha.relacaoEmpregaticia.ctpsAssinadaCerto)}` }],
                [{ text: `Dispensa:\n${isNull(data.ficha.relacaoEmpregaticia.dispensa)}` }, { text: `Trabalhava em Domingos e Feriados:\n${isNull(data.ficha.relacaoEmpregaticia.horarioHorasExtras)}` }],
                [{ text: `Jornada de Trabalho:\n${isNull(data.ficha.relacaoEmpregaticia.jornadaTrabalho)}` }, { text: `Fazia Horas Extras(HE)?\n${isNull(data.ficha.relacaoEmpregaticia.faziaHorasExtras)}` }],
                [{ text: `Recebia Gratificação?\n${isNull(data.ficha.relacaoEmpregaticia.recebiaGratificacoes)}` }, { text: `Cumpriu Aviso Prévio?\n${isNull(data.ficha.relacaoEmpregaticia.cumpriuAvisoPrevio)}` }],
                [{ text: `Tem Férias Vencidas a Gozar?\n${isNull(data.ficha.relacaoEmpregaticia.temFeriasVencidasGozar)}` }, { text: `Recebeu 13º salário no ano anterior?\n${isNull(data.ficha.relacaoEmpregaticia.recebeu13SalarioAnoAnterior)}` }],
                [{ text: `O FGTS foi depositado?\n${isNull(data.ficha.relacaoEmpregaticia.fgtsDepositado)}` }, { text: `Recebeu as guias de saque do FGTS?\n${isNull(data.ficha.relacaoEmpregaticia.recebeuGuiasSaqueFgts)}` }],
                [{ text: `Recebeu os formulários para requerer o seguro desemprego?\n${isNull(data.ficha.relacaoEmpregaticia.recebeuFormSeguroDesemprego)}` }, { text: `O INSS foi recolhido?\n${isNull(data.ficha.relacaoEmpregaticia.inssRecolhido)}` }],
                [{ text: `Paga alguma verba?\n${isNull(data.ficha.relacaoEmpregaticia.pagaAlgumaVerba)}` }, { text: `Saldo do salário:\n${isNull(data.ficha.relacaoEmpregaticia.saldoSalario)}` }],
                [{ text: `Aviso prévio indenizado:\n${isNull(data.ficha.relacaoEmpregaticia.pagaAlgumaVerba)}`, colSpan: 2 }, ''],
                [{ text: `13º Salário Proporcional\n${isNull(data.ficha.relacaoEmpregaticia._13SalarioProporcional)}` }, { text: `Férias Vencidas?\n${isNull(data.ficha.relacaoEmpregaticia.feriasVencidas)}` }],
                [{ text: `Férias proporcionais:\n${isNull(data.ficha.relacaoEmpregaticia.feriasProporcionais)}`, colSpan: 2 }, ''],
                [{ text: `1/3 Constitucional sobre férias:\n${isNull(data.ficha.relacaoEmpregaticia.umTercoConstitucionalFerias)}` }, { text: `Comissões?\n${isNull(data.ficha.relacaoEmpregaticia.comissoes)}` }],
                [{ text: `Informações Complementares:\n${isNull(data.ficha.relacaoEmpregaticia.outrasInformacoes)}`, colSpan: 2 }, ''],
                [{ text: 'Documentação Depositada', colSpan: 2, style: 'tableHeader' }, ''],
                [{ text: 'Documento', style: 'tableHeader' }, { text: 'Foi depositado?', style: 'tableHeader' },],
                [{ text: 'Procuração' }, isNull(data.ficha.documentosDepositadosNpj.procuracao)],
                [{ text: 'Carteira de Trabalho(CTPS)' }, isNull(data.ficha.documentosDepositadosNpj.ctps)],
                [{ text: 'Carteira de Identidade' }, isNull(data.ficha.documentosDepositadosNpj.identidade)],
                [{ text: 'Declaração de Pobreza' }, isNull(data.ficha.documentosDepositadosNpj.declaracaoPobreza)],
                [{ text: 'CPF' }, isNull(data.ficha.documentosDepositadosNpj.cpf)],
                [{ text: 'PIS' }, isNull(data.ficha.documentosDepositadosNpj.pis)],
                [{ text: 'Contracheque dos últimos três meses' }, isNull(data.ficha.documentosDepositadosNpj.contrachequeUltimos3Meses)],
                [{ text: 'Extrato analitico do FGTS' }, isNull(data.ficha.documentosDepositadosNpj.extratoAnaliticoContaFgts)],
                [{ text: 'TRCT' }, isNull(data.ficha.documentosDepositadosNpj.trct)],
                [{ text: 'Comprovante de Rec. de Atencip. do 13º, se for o caso' }, isNull(data.ficha.documentosDepositadosNpj.comprovanteRecAntecip13)],
                [{ text: 'Outros documentos' }, isNull(data.ficha.documentosDepositadosNpj.outrosDocumentos)],

              ]
            }
          },
          buildHistoricoSection(data.historico),
          buildEnvolvidosSection(data.envolvidos),
          {
            table: {
              widths: ['*', '*'],
              body: [
                [{ text: '\n\n\n_____________________________', alignment: 'center' },
                  { text: '\n\n\n_____________________________', alignment: 'center' }],
                [{ text: ' \t\t\t\t\t\tAssinatura do atendente', preserveLeadingSpaces: true, border: [false, false, false, false] }, { text: ' \t\t\t\t\t\tAssinatura do assistido', preserveLeadingSpaces: true, border: [false, false, false, false] }],
              ]
            },
            layout: {
              hLineWidth: function (i: any, node: any) {
                return (i === 2) ? 1 : 0;
              },
              vLineWidth: function (i: any, node: any) {
                return 0;
              }
            }
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5],

          },
          subtitle: {
            bold: true,
            fillColor: '#e0dede'
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            alignment: 'center', margin: [5, 5, 5, 5], fillColor: '#d1cfcf', bold: true
          }
        }
      };

      pdfMake.createPdf(docDefinition).open();
    }

  } catch (error) {
    console.log(error);
  }

}

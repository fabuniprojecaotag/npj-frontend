import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { FormGroup, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
// import { generatePdf } from './Print';
import { ProcessosService } from 'src/app/feature/processos/services/processos.service';
import { Processo } from 'src/app/core/types/processo';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.scss']
})
export class EstatisticasComponent implements OnInit, AfterViewInit {
  devMode = false;
  tituloPagina = 'Estatisticas';
  dataSource: any;
  colunasMostradas: string[] = ['id', 'data', 'vara', 'forum'];
  listaProcesso: Processo[] = [];
  controlSection: any = 'assistidos';
  chart: any;
  chartProcesso: any;
  chartAtendimento: any;
  currentDate: Date = new Date();
  range = new FormGroup({
    start: new FormControl<Date | null>(this.currentDate),
    end: new FormControl<Date | null>(new Date()),
  });

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private service: ProcessosService
  ) {
    this.dateAdapter.setLocale('pt-BR'); //dd/MM/yyyy
    this.currentDate.setDate(this.currentDate.getDate() - 7);
  }
  ngOnInit(): void {
    this.createChart();
  }

  ngAfterViewInit(): void {
    // TODO: corrigir lógica para obter registros
    this.service.getAllPaginated().subscribe({
      next: (response) => {
        this.listaProcesso = response.list;

        // this.dataSource = new MatTableDataSource<Processo>(this.listaProcesso);
        // this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Erro ao listar processos:', err);
      }
    });
  }
  changeSection(section: string) {
    this.controlSection = section;

    // if(this.chart!=undefined){
    //   this.chart.update()
    // }else{
    //   this.createChart()

    // }
  }
  createChart() {

    this.chart = new Chart('MyChart', {
      type: 'pie', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['Lucas', 'Pedro', 'Afonso', 'Thomas',
          'Alberto', 'Jonas', 'Lucius', 'Ricardo',],
        // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
        // 				 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          // {
          //   label: "Sales",
          //   data: ['467','576', '572', '79', '92',
          // 			 '574', '573', '576'],
          //   backgroundColor: 'blue'
          // },
          {
            // label: "Profit",
            label: 'Quantidade de Processos',
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            // backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {

          // y: {
          //     ticks: {
          //         // Include a dollar sign in the ticks
          //         callback: function(value, index, ticks) {
          //             return '$' + value;
          //         }
          //     }
          // }
        }
      }

    });
    this.chartProcesso = new Chart('chartProcesso', {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['Lucas', 'Pedro', 'Afonso', 'Thomas',
          'Alberto', 'Jonas', 'Lucius', 'Ricardo',],
        // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
        // 				 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          // {
          //   label: "Sales",
          //   data: ['467','576', '572', '79', '92',
          // 			 '574', '573', '576'],
          //   backgroundColor: 'blue'
          // },
          {
            // label: "Profit",
            label: 'Quantidade de Processos',
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            // backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {

          // y: {
          //     ticks: {
          //         // Include a dollar sign in the ticks
          //         callback: function(value, index, ticks) {
          //             return '$' + value;
          //         }
          //     }
          // }
        }
      }

    });
    this.chartAtendimento = new Chart('chartAtendimento', {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['Lucas', 'Pedro', 'Afonso', 'Thomas',
          'Alberto', 'Jonas', 'Lucius', 'Ricardo',],
        // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
        // 				 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          // {
          //   label: "Sales",
          //   data: ['467','576', '572', '79', '92',
          // 			 '574', '573', '576'],
          //   backgroundColor: 'blue'
          // },
          {
            // label: "Profit",
            label: 'Quantidade de Processos',
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            // backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {

          // y: {
          //     ticks: {
          //         // Include a dollar sign in the ticks
          //         callback: function(value, index, ticks) {
          //             return '$' + value;
          //         }
          //     }
          // }
        }
      }

    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async downloadPdf() {
    try {
      // await generatePdf();
    } catch (error) {
      console.log(`erro ao imprimir:${  error}`);
    }
  }
}

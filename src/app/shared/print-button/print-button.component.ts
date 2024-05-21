import { Component, Input } from '@angular/core';
import { generatePdf } from './printLista';
import { generatePdf as generatePdfSolo } from './printAtendimento';

@Component({
  selector: 'app-print-button',
  templateUrl: './print-button.component.html',
  styleUrls: ['./print-button.component.scss']
})
export class PrintButtonComponent {

  @Input() dataSet: any = [];
  @Input() pageName: string = 'NAN';
  @Input() config: any= [];
  @Input() solo: any = false;
  @Input() visible: any = true;


  printTable() {
    if (this.dataSet.length == 0) {
      return
    }
    generatePdf(
      this.config
      , this.dataSet
      , this.pageName);
  }


  printSolo() {
    console.log(this.dataSet)
    generatePdfSolo(this.dataSet,this.pageName)
  }
}

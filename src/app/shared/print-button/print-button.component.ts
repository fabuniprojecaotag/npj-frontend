import { Component, Input } from '@angular/core';
import { generatePdf } from './printLista';

@Component({
  selector: 'app-print-button',
  templateUrl: './print-button.component.html',
  styleUrls: ['./print-button.component.scss']
})
export class PrintButtonComponent {

  @Input() dataSet: any = [];
  @Input() pageName: string = 'NAN';
  @Input() config: any = [];

  printTable() {
    if (this.dataSet.length == 0) {
      return
    }
    generatePdf(
      this.config
      , this.dataSet
      , this.pageName);
  }
}

import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-utils-bar',
  templateUrl: './utils-bar.component.html',
  styleUrls: ['./utils-bar.component.scss']
})
export class UtilsBarComponent {
  constructor(private router: Router, private location: Location) {}

  avancar(): void {
    this.location.forward();
  }

  voltar(): void {
    this.location.back();
  }

  recarregar(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}

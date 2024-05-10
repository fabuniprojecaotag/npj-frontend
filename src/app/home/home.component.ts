import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  subtituloDaPagina: string = 'Home';
  tituloDaPagina: string = 'Home';


  constructor(public dialog: MatDialog) {

  }

  verifyLocalStorageDialogFlag(): any {
    const item = localStorage.getItem(`firstTime`);
    return item ? JSON.parse(item) : null;
  }

  ngOnInit(): void {
    if (!this.verifyLocalStorageDialogFlag()) {
      this.openDialog()
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      localStorage.setItem('firstTime', JSON.stringify(true));
      console.log(`Dialog result: ${result}`);

    });
  }
}
@Component({
  selector: 'welcome-dialog',
  templateUrl: 'welcome-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogContentExampleDialog { }

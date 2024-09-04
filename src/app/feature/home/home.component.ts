import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subtituloDaPagina = 'Home';
  tituloDaPagina = 'Home';


  constructor(public dialog: MatDialog) {

  }

  verifyLocalStorageDialogFlag(): boolean {
    const item = localStorage.getItem('firstTime');
    return item ? JSON.parse(item) : null;
  }

  ngOnInit(): void {
    if (!this.verifyLocalStorageDialogFlag()) {
      this.openDialog();
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      localStorage.setItem('firstTime', JSON.stringify(true));
    });
  }
}
@Component({
  selector: 'app-welcome-dialog',
  templateUrl: 'welcome-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogContentExampleDialogComponent { }

import { Component } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss']
})
export class FileDownloadComponent {

  constructor(private fileService: FileService) { }

  downloadFile() {
    const fileName = '0889d10c-be35-4ccb-b82c-700f5d926644.png'; // Arquivo exemplo armazenado no Storage

    this.fileService.downloadFile(fileName).subscribe((response: any) => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}

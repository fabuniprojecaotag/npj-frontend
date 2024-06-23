import { Component } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  selectedFile: File | null = null;

  constructor(private fileService: FileService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  uploadFile() {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe(response => {
        alert('File uploaded successfully!');
      }, error => {
        console.error(error);
        alert('Failed to upload file.');
      });
    } else {
      alert('Please select a file first.');
    }
  }
}

import { Component } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  selectedFiles: File[] | null = null;

  constructor(private fileService: FileService) { }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
    console.log('Files selected:', this.selectedFiles);
  }

  uploadFiles() {
    if (this.selectedFiles) {
      this.fileService.uploadFile(this.selectedFiles).subscribe(response => {
        alert('Files uploaded successfully!');
      }, error => {
        console.error(error);
        alert('Failed to upload files.');
      });
    } else {
      alert('Please select a files first.');
    }
  }
}

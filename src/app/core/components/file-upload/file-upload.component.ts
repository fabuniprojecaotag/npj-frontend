import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Input() directory!: string;
  @Output() fileUploaded = new EventEmitter<void>();
  selectedFiles: File[] | null = null;

  constructor(private fileService: FileService) {}

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  uploadFiles() {
    if (this.selectedFiles) {
      this.fileService
        .uploadFile(this.selectedFiles, this.directory)
        .subscribe({
          next: () => {
            this.fileUploaded.emit(); // Notifica o sucesso do upload
            alert('Upload efetuado com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao carregar arquivos: ', err);
          },
        });
    } else {
      alert('Por favor, selecione o(s) arquivo(s) primeiro.');
    }
  }
}

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
  uploadProgress = 0; // Progresso inicial do upload

  constructor(private fileService: FileService) {}

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  uploadFiles() {
    if (this.selectedFiles) {
      this.fileService
        .uploadFiles(this.selectedFiles, this.directory)
        .subscribe({
          next: (progress: number) => {
            this.uploadProgress = progress; // Atualiza a barra de progresso
          },
          complete: () => {
            this.fileUploaded.emit(); // Notifica o sucesso do upload
            this.uploadProgress = 0;  // Reseta a barra
          },
          error: (err) => {
            console.error('Erro ao carregar arquivos: ', err);
            this.uploadProgress = 0;  // Reseta a barra em caso de erro
          },
        });
    } else {
      alert('Por favor, selecione o(s) arquivo(s) primeiro.');
    }
  }
}

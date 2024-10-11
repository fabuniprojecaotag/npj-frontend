import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileService } from '../../services/file.service';
import { FileData } from '../../types/file-data';
import { MensagemErroService } from '../../services/mensagem-erro.service';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss'],
})
export class FileDetailsComponent {
  @Input() file!: FileData;
  @Output() fileDeleted = new EventEmitter<string>();

  constructor(
    private fileService: FileService,
    private mensagemErro: MensagemErroService
  ) {}

  deleteFile(): void {
    this.fileService.deleteFile(this.file.name, this.file.directory).subscribe({
      next: () => {
        this.fileDeleted.emit(this.file.name);
      },
      error: (err) => {
        this.mensagemErro.mostrarMensagemErro(500, 'Erro ao excluir arquivo');
      },
    });
  }

  download(): void {
    this.fileService
      .downloadFile(this.file.name, this.file.directory)
      .subscribe((response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  }
}

import { Component, inject, Input, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { FileData } from '../../types/file-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensagemErroService } from '../../services/mensagem-erro.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit {
  @Input() directory!: string;
  fileUploads: FileData[] = [];
  private snackBar = inject(MatSnackBar);
  isLoading = true;

  constructor(
    private fileService: FileService,
    private mensagemErro: MensagemErroService
  ) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  onFileDeleted(name: string) {
    // Atualiza a lista localmente removendo o arquivo excluído
    this.fileUploads = this.fileUploads.filter((file) => file.name != name);
  }

  onFileUploaded() {
    this.loadFiles(); // Recarrega a lista de arquivos após o upload
  }

  loadFiles() {
    this.fileService.listFiles(this.directory).subscribe({
      next: (response) => {
        if (response.list.length !== 0 && response.pageSize !== 0) {
          var list: FileData[] = response.list;

          var fileNames: string[] = [];
          this.fileUploads.forEach((file) => {
            fileNames.push(file.name);
          });

          list.forEach((file) => {
            file.name = this.formatFileName(file.name); // Ex.: ATE00025/document.pdf → document.pdf
            file.directory = this.directory;

            // Inclui o arquivo se não houver localmente
            if (!fileNames.includes(file.name)) {
              this.fileUploads.push(file);
            }

            this.isLoading = false;
          });
        } else {
          this.openSnackBar(
            'Não há arquivos armazenados para ' + this.directory
          );
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.mensagemErro.mostrarMensagemErro(500, 'Erro ao excluir arquivo');
        this.isLoading = false;
      },
    });
  }

  private formatFileName(fileName: string): string {
    return fileName.split('/')[1]; // Ex.: ATE00025/document.pdf → document.pdf
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar');
  }
}

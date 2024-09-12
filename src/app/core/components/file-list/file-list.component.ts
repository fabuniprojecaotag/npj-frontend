import { Component, inject, Input, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { FileData } from '../../types/file-data';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private fileService: FileService) {}

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
            let formattedName = file.name.split('/')[1]; // Ex.: ATE00025/document.pdf → document.pdf
            file.name = formattedName;
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
        console.error('Erro ao carregar arquivos: ', err);
        this.isLoading = false;
      },
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar');
  }
}

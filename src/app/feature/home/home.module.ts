import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../core/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FileDownloadComponent } from '../components/file-download/file-download.component';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    HomeComponent,
    FileDownloadComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})

export class HomeModule { }

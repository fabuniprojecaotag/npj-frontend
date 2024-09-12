import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../core/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FileUploadComponent } from 'src/app/core/components/file-upload/file-upload.component';
import { FileListComponent } from 'src/app/core/components/file-list/file-list.component';
import { FileDetailsComponent } from 'src/app/core/components/file-details/file-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    FileUploadComponent,
    FileListComponent,
    FileDetailsComponent
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

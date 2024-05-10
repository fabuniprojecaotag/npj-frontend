import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssistidoAddComponent } from './assistidos/assistido-add/assistido-add.component';
import { AssistidosEditComponent } from './assistidos/assistidos-edit/assistidos-edit.component';
import { AssistidosShortcutsComponent } from './assistidos/assistidos-shortcuts/assistidos-shortcuts.component';
import { AssistidosComponent } from './assistidos/assistidos.component';
import { AutenticacaoInterceptor } from './autenticacao/autenticacao.interceptor';
import { ErroModule } from './core/erro/erro.module';
import { MaterialModule } from './core/material/material.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AssistidosComponent,
    AssistidoAddComponent,
    AssistidosEditComponent,
    AssistidosShortcutsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective, NgxMaskPipe,
    HomeModule,
    ErroModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true,
    },
    provideNgxMask()
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

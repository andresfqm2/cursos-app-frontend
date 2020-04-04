import { ServerErrorsInterceptor } from './_shared/server-errors.interceptor';
import { environment } from './../environments/environment';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PerfilComponent } from './pages/login/perfil/perfil.component';
import { RegistroComponent } from './pages/login/registro/registro.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';


export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  return tk != null ? tk : '';
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Not403Component,
    Not404Component,
    RecuperarComponent,
    TokenComponent,
    PerfilComponent,
    RegistroComponent,
    EstudianteComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/login/enviarCorreo']
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

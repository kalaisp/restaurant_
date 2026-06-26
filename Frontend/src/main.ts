import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { importProvidersFrom } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HttpErrorInterceptorService } from './app/services/httperor-interceptor.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
     provideAnimations(),
     importProvidersFrom(
      BsDropdownModule,
      TabsModule,
      ButtonsModule
    ),

    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    }
  ]
});

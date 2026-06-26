
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { Routes } from '@angular/router';

import {

  withInterceptors,
  HttpInterceptorFn
} from '@angular/common/http';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';
import { HttpErrorInterceptorService } from './services/httperor-interceptor.service';
const routes: Routes = [
  { path: '', component: PropertyListComponent },
    { path: 'property-details/:id', component: PropertyDetailComponent,resolve:{prp:PropertyDetailResolverService} },
  { path: 'rent-property', component: PropertyListComponent },         // ✅ Default route
  { path: 'add-property', component: AddPropertyComponent },
     { path: 'user/register', component: UserRegisterComponent },
      { path: 'user/login', component: UserLoginComponent },
      { path: '**', component: PropertyListComponent }

];
export const testInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('INTERCEPTOR WORKING:', req.url);
  return next(req);
};
export const appConfig: ApplicationConfig = {
  providers: [  provideRouter(routes),
     provideHttpClient(
      withInterceptors([testInterceptor])
    )
  ]
};

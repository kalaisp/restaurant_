import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from "./property/property-list/property-list.component";
import { AddPropertyComponent } from './property/add-property/add-property.component';
import {Routes,RouterModule} from '@angular/router';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
//  import { UserServiceService } from './services/user-service.service';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
// import { FileUploadModule} from 'ng2-file-upload';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptorService } from './services/httperor-interceptor.service';
const approutes:Routes=[
  {path:'add-property',component:AddPropertyComponent}
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavBarComponent,PropertyCardComponent,
            PropertyListComponent,AddPropertyComponent,PropertyDetailComponent,FormsModule,UserLoginComponent,
            ReactiveFormsModule,BsDropdownModule,FilterPipe,SortPipe],
  providers:[AlertifyService,AuthService,PropertyDetailResolverService],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'restaurant';
}

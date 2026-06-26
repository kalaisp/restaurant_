import {  UserForLogin } from './../../model/user';
import { Router } from '@angular/router';
import { routes } from './../../app.routes';
import { AuthService } from './../../services/auth.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  imports: [FormsModule]
})
export class UserLoginComponent implements OnInit {

  constructor(private authService:AuthService,
              private alertify:AlertifyService,
              private router:Router
  ) { }
showPassword = false;
loginSubmited = false;
  ngOnInit() {
  }
  onLogin(loginForm: NgForm) {
    this.loginSubmited = true;
      this.authService.authuser(loginForm.value).subscribe(
      (response:any)=>{
        console.log(response);
        const user=response;
          localStorage.setItem('token',user.token);
              localStorage.setItem('userName',user.userName)
      this.alertify.success('Login Successful');
      this.router.navigate(['/']);
      },error=>{
        console.log(error);
      // ✅ Safely extract the error message string
      const message = error?.error?.errorMessage || 'Invalid username or password';
      this.alertify.error(message);
      }
     );
    // if (token) {
    //   localStorage.setItem('token',token.username)
    //   this.alertify.success('Login Successful');
    //   this.router.navigate(['/']);
    // }
    // else{
    //   this.alertify.error('user id or password is wrong');
    //    loginForm.reset();
    //   this.loginSubmited = false;
    // }
  }
}

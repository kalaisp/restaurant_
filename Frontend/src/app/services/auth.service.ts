import { HttpClient } from '@angular/common/http';
// import { User } from './../model/user';
import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { UserForLogin,UserForRegister } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl=environment.baseUrl;
// eslint-disable-next-line @angular-eslint/prefer-inject
constructor(private http:HttpClient) { }
authuser(user: UserForLogin) {
  return this.http.post(this.baseUrl+'/account/login',user);

  }
  registeruser(user:UserForRegister){
    return this.http.post(this.baseUrl+'/account/register',user);
  }
}

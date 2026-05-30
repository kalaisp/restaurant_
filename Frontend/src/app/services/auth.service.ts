import { User } from './../model/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }
authuser(user: any) {

  let UserArray: User[] = [];
  if (localStorage.getItem('users')) {
    UserArray = JSON.parse(
      localStorage.getItem('users') || '[]'
    );
  }
  return UserArray.find(
    (p: User) =>
      p.email === user.email &&
      p.password === user.password
  );
  }

}
// authuser(user: any) {

//   let UserArray: User[] = [];
//   if (localStorage.getItem('users')) {
//     UserArray = JSON.parse(
//       localStorage.getItem('users') || '[]'
//     );
//   }
//   return UserArray.find(
//     (p: User) =>
//       p.username === user.username &&
//       p.password === user.password
//   );
//   }
// }

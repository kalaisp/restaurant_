import { Housing } from './../../services/housing';
import { property } from './../../model/property';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { EMPTY } from 'rxjs';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<property> {

constructor( private route:Router,private housing:Housing) { }
resolve(route: ActivatedRouteSnapshot): Observable<property> {
  const propId = +route.params['id'];
  console.log('Resolving propId:', propId);  // is this 2?

  return this.housing.getProperty(propId).pipe(
    //tap(result => console.log('Resolver result:', result))  // what does it find?
   catchError(error => {
      this.route.navigate(['/']);  // ✅ navigate away
      return EMPTY;                // ✅ return empty Observable instead of void
    })
    );

}
}


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, concatMap, Observable, retry,timer, throwError } from 'rxjs';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private alertify:AlertifyService) {
    console.log('Interceptor Created');   // This should show at app start
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('🚀 Http Request Started:', req.url);
    return next.handle(req)
      .pipe(
         retry({
        count: 3,
        delay: (error: HttpErrorResponse) => {
          if (error.status === 0) {
            return timer(1000); // ✅ Retry only network errors
          }
          return throwError(() => error); // ✅ 401/400/404 — skip retry
        }
      }),
        // retryWhen(error=>
        //   error.pipe(
        //     concatMap((checkErr:HttpErrorResponse)=>{
        //       if(checkErr.status===0 && this.retryCount < 10){
        //         return of(checkErr);
        //       }
        //       return throwError(checkErr);
        //     })
        // )),
        catchError((error:HttpErrorResponse)=>{
          const errorMessage=this.setError(error);
          console.log(error);
          this.alertify.error(errorMessage);
          return throwError(errorMessage);

        })
      )
  }
 setError(error: HttpErrorResponse): string {
  let errorMessage = 'Unknown error occurred';

  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else if (error.status === 401) {
    errorMessage = error.statusText;
  } else if (error.error?.ErrorMessage||error.status !== 0) {
    errorMessage = error.error?.ErrorMessage
                  || error.error?.message
                  || error.message
                  || 'Server error occurred';
  } else {
    errorMessage = 'Cannot connect to server';
  }

  return errorMessage;
}

}

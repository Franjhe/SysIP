import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorServiceService implements HttpInterceptor {
  url401='';
  reload = 0;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = localStorage.getItem("user");
    const token = JSON.parse(isLoggedIn);

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: token.data.token
        }
      });
    }
   
    if(this.reload > 30){
      setTimeout(x => {
        this.reload = 0;

      },10000)
      return EMPTY
    }else {
      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.status === 200) {
            this.url401 = '';
            this.reload = 0;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            if(this.url401 == request.url){
              if(this.reload > 12){
                this.reload = 0;
              }else {
                this.reload ++;
              }
              
            }else{
              this.url401 = request.url;
              this.reload = 0;
            }
            
            localStorage.removeItem('user');
            if(this.router.url == '/login' || this.router.url == '/'){
            }else{
              this.router.navigateByUrl('/login');
            }
            
          }
  
          return throwError( err );
  
        })
      );
    }

    // return next.handle(request)
    
  }


}
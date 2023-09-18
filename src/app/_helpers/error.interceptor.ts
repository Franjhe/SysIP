import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MaterialExampleModule } from './../material.module';

import { AuthenticationService } from './../../app/_services';
import { NotificationService } from './../_services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
                private notificationService: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            if ([401].includes(err.status)) {
                this.authenticationService.logout();
            }
            if ([500].includes(err.status)) {
                this.notificationService.showError(500, 'Lo sentimos, se ha producido un error en el servidor. Por favor, inténtalo de nuevo más tarde o contacta al soporte técnico para obtener ayuda.');
            }

            const error = err.error.message || err.statusText;

            // this.toast.open(error, '', {
            //     duration: 6000,
            //     verticalPosition: 'top',
            //     panelClass: ['error-toast']
            // });

            return throwError(error);
        }))
    }
}


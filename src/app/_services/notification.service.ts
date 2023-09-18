import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private errorSubject = new Subject<{ code: number; message: string }>();

  error$ = this.errorSubject.asObservable();

  showError(code: number, message: string) {
    this.errorSubject.next({ code, message });
  }
}
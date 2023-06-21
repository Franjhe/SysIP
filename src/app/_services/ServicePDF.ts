import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfGenerationService {
  private generatePdfSubject = new Subject<void>();

  generatePdf$ = this.generatePdfSubject.asObservable();

  triggerPdfGeneration() {
    this.generatePdfSubject.next();
  }
}
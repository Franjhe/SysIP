import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  isLoading = false;
  
  constructor() { }

  show() {
    this.isLoading = true;
  }
  
  hide() {
    this.isLoading = false;
  }
  
}
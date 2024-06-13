import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.scss']
})
export class InquiriesComponent {
  showTable: boolean = true;


  constructor(
    private router: Router,
  )
  {}

  linkAuto(){
    this.router.navigate(['/quotes/surety-quotes']);

  }
}

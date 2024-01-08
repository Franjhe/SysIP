import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { MaterialExampleModule } from './../../material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { AutomobileQuotesComponent } from './automobile-quotes/automobile-quotes.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { AutomobileInquiriesComponent } from './inquiries/automobile-inquiries/automobile-inquiries.component';


@NgModule({
  declarations: [
    AutomobileQuotesComponent,
    InquiriesComponent,
    AutomobileInquiriesComponent,
  ],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule
  ]
})
export class QuotesModule { }

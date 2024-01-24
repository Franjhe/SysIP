import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from './../../material.module'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { CollectionRoutingModule } from './collection-routing.module';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { PaymentCancellationComponent } from './payment-cancellation/payment-cancellation.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    PaymentReportComponent,
    PaymentCancellationComponent
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    CommonModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    NgbAccordionModule,
    ClipboardModule
  ]
})
export class CollectionModule { }

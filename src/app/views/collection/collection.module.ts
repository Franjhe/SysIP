import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from './../../material.module'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table'  
import { CollectionRoutingModule } from './collection-routing.module';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { PaymentCancellationComponent } from './payment-cancellation/payment-cancellation.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CommissionsComponent } from './commissions/commissions.component';
import { PaymentRequestsComponent } from './payment-requests/payment-requests.component';
import { PaymentAdministrationComponent } from './payment-administration/payment-administration.component';

@NgModule({
  declarations: [
    PaymentReportComponent,
    PaymentCancellationComponent,
    CommissionsComponent,
    PaymentRequestsComponent,
    PaymentAdministrationComponent
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
    ClipboardModule,
    MatTableModule,
  ]
})
export class CollectionModule { }

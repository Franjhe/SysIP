import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremiumsComponent } from './premiums/premiums.component';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module'
import { MaterialExampleModule } from './../../material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { ReceiptsComponent } from './receipts/receipts.component';


@NgModule({
  declarations: [
    PremiumsComponent,
    ReportsComponent,
    ReceiptsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }

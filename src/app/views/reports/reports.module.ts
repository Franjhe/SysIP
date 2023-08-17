import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremiumsComponent } from './premiums/premiums.component';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module'
import { MaterialExampleModule } from './../../material.module'

@NgModule({
  declarations: [
    PremiumsComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialExampleModule
  ]
})
export class ReportsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialExampleModule } from './../../material.module'
import { MastersRoutingModule } from './masters-routing.module';
import { TradesComponent } from './trades/trades.component';


@NgModule({
  declarations: [
    TradesComponent
  ],
  imports: [
    CommonModule,
    MaterialExampleModule,
    MastersRoutingModule
  ]
})
export class MastersModule { }

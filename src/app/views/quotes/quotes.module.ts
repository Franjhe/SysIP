import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { MaterialExampleModule } from './../../material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { AutomobileQuotesComponent } from './automobile-quotes/automobile-quotes.component';


@NgModule({
  declarations: [
    AutomobileQuotesComponent
  ],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule
  ]
})
export class QuotesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { EmissionsRoutingModule } from './emissions-routing.module';
import { AutomobileComponent } from './automobile/automobile.component';
import { MaterialExampleModule } from './../../material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { SuretyComponent } from './surety/surety.component';


@NgModule({
  declarations: [
    AutomobileComponent,
    SuretyComponent
  ],
  imports: [
    CommonModule,
    EmissionsRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ]
})
export class EmissionsModule { }

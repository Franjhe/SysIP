import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmissionsRoutingModule } from './emissions-routing.module';
import { AutomobileComponent } from './automobile/automobile.component';
import { MaterialExampleModule } from './../../material.module'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AutomobileComponent
  ],
  imports: [
    CommonModule,
    EmissionsRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule
  ]
})
export class EmissionsModule { }

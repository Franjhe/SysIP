import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { EmissionsRoutingModule } from './emissions-routing.module';
import { AutomobileComponent } from './automobile/automobile.component';
import { MaterialExampleModule } from './../../material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { SuretyComponent } from './surety/surety.component';
import { SelfManagementComponent } from './self-management/self-management.component';
import { AutomobileNewComponent } from './automobile-new/automobile-new.component';


@NgModule({
  declarations: [
    AutomobileComponent,
    SuretyComponent,
    SelfManagementComponent,
    AutomobileNewComponent
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

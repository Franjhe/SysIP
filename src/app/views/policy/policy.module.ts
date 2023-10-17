import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialExampleModule } from './../../material.module'

import { PolicyRoutingModule } from './policy-routing.module';
import { CertificatesComponent } from './certificates/certificates.component';
import { AutomobilePolicyComponent } from './automobile-policy/automobile-policy.component';


@NgModule({
  declarations: [
    CertificatesComponent,
    AutomobilePolicyComponent
  ],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    MaterialExampleModule
  ]
})
export class PolicyModule { }

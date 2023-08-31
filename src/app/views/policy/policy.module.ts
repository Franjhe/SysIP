import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import { CertificatesComponent } from './certificates/certificates.component';


@NgModule({
  declarations: [
    CertificatesComponent
  ],
  imports: [
    CommonModule,
    PolicyRoutingModule
  ]
})
export class PolicyModule { }

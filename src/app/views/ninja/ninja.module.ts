import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from './../../material.module'

import { NinjaRoutingModule } from './ninja-routing.module';
import { NinjaComponent } from './ninja/ninja.component';


@NgModule({
  declarations: [
    NinjaComponent
  ],
  imports: [
    CommonModule,
    NinjaRoutingModule,
    MaterialExampleModule
  ]
})
export class NinjaModule { }

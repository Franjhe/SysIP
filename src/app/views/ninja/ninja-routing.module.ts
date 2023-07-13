import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NinjaComponent } from './ninja/ninja.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ninja',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ninja',
      },
      {
        path: 'ninja',
        component: NinjaComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NinjaRoutingModule { }

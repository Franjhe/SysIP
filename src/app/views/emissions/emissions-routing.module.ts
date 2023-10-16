import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomobileComponent } from './automobile/automobile.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'emissions',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'automobile',
        component: AutomobileComponent,
        data: {
          title: 'automobile',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmissionsRoutingModule { }

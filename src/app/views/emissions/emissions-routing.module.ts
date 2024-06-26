import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomobileComponent } from './automobile/automobile.component';
import { SuretyComponent } from './surety/surety.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'emissions',
    },
    canActivate: [AuthGuard],

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
      {
        path: 'surety',
        component: SuretyComponent,
        data: {
          title: 'surety',
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

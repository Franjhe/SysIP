import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradesComponent } from './trades/trades.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'masters',
    },
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'trades',
        component: TradesComponent,
        data: {
          title: 'trades',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }

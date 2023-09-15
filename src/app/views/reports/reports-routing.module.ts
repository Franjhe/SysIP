import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PremiumsComponent} from './premiums/premiums.component'
import { ReportsComponent } from './reports.component';
import { ReceiptsComponent } from './receipts/receipts.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'reports',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reports',
      },
      {
        path: 'consult',
        component: ReportsComponent,
        data: {
          title: 'consulta',
        },
      },
      {
        path: 'consult/premiums',
        component: PremiumsComponent,
        data: {
          title: 'primas',
        },
      },
      {
        path: 'consult/receipts',
        component: ReceiptsComponent,
        data: {
          title: 'Recibos',
        },
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {
}

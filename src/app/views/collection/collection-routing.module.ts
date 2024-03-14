import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCancellationComponent } from './payment-cancellation/payment-cancellation.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { PaymentRequestsComponent } from './payment-requests/payment-requests.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'collection',
  },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'collection',
    },
    {
      path: 'collection',
      component: PaymentCancellationComponent,
      data: {
        title: 'collection',
      },
    },
    {
      path: 'commissions',
      component: CommissionsComponent,
      data: {
        title: 'commissions',
      },
    },
    {
      path: 'payment_requests',
      component: PaymentRequestsComponent,
      data: {
        title: 'payment-requests',
      },
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }

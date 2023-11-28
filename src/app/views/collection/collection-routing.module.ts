import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCancellationComponent } from './payment-cancellation/payment-cancellation.component';

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
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }

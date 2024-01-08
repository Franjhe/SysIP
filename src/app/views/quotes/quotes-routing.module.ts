import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomobileQuotesComponent } from './automobile-quotes/automobile-quotes.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { AutomobileInquiriesComponent } from './inquiries/automobile-inquiries/automobile-inquiries.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'quotes',
  },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'cards',
    },
    {
      path: 'automobile-quotes',
      component: AutomobileQuotesComponent,
      data: {
        title: 'automobile-quotes',
      },
    },
    {
      path: 'inquiries',
      component: InquiriesComponent,
      data: {
        title: 'inquiries',
      },
    },
    {
      path: 'inquiries/automobile',
      component: AutomobileInquiriesComponent,
      data: {
        title: 'Automovil',
      },
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomobileQuotesComponent } from './automobile-quotes/automobile-quotes.component'

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
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { PolizaComponent } from './poliza.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';

const routes: Routes = [{
  path: '',
  data: {
    title: 'poliza',
  },
  canActivate: [AuthGuard],

  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'poliza',
    },
    {
      path: 'search-poliza',
      component: SearchComponent,
      data: {
        title: 'Search poliza',
      },
    },
    {
      path: 'poliza',
      component: PolizaComponent,
      data: {
        title: 'poliza',
      },
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolizaRoutingModule { }

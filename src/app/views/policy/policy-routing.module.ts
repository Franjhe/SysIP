import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesComponent } from './certificates/certificates.component'
import { AutomobilePolicyComponent } from './automobile-policy/automobile-policy.component'
import { AuthGuard } from 'src/app/_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'certificates',
    },
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'certificates',
      },
      {
        path: 'certificates',
        component: CertificatesComponent,
      },
      {
        path: 'automobile-policy',
        component: AutomobilePolicyComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }

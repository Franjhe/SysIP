import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesComponent } from './certificates/certificates.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'certificates',
    },
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }

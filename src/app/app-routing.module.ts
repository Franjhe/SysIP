import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { PaymentReportComponent } from './views/collection/payment-report/payment-report.component';
import { SelfManagementComponent } from './views/emissions/self-management/self-management.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },

      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'masters',
        loadChildren: () =>
          import('./views/masters/masters.module').then((m) => m.MastersModule)
      },
      {
        path: 'security',
        loadChildren: () =>
          import('./views/security/security.module').then((m) => m.SecurityModule)
      },
      {
        path: 'ninja',
        loadChildren: () =>
          import('./views/ninja/ninja.module').then((m) => m.NinjaModule)
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./views/reports/reports.module').then((m) => m.ReportsModule)
      },
      {
        path: 'policy',
        loadChildren: () =>
          import('./views/policy/policy.module').then((m) => m.PolicyModule)
      },
      {
        path: 'emissions',
        loadChildren: () =>
          import('./views/emissions/emissions.module').then((m) => m.EmissionsModule)
      },
      {
        path: 'collection',
        loadChildren: () =>
          import('./views/collection/collection.module').then((m) => m.CollectionModule)
      },
      {
        path: 'quotes',
        loadChildren: () =>
          import('./views/quotes/quotes.module').then((m) => m.QuotesModule)
      },
      {
        path: 'collection',
        loadChildren: () =>
          import('./views/collection/collection.module').then((m) => m.CollectionModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'payment-report',
    component: PaymentReportComponent,
    data: {
      title: 'Payment Report '
    }
  },
  {
    path: 'self-management',
    component: SelfManagementComponent,
    data: {
      title: 'Self Management '
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { InfoUserComponent } from './user/info-user/info-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RolComponent } from './rol/rol.component';
import { DepartamentComponent } from './departament/departament.component';
import { MenuComponent } from './menu/menu.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'security',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user',
      },
      {
        path: 'user',
        component: UserComponent,
        children: [
          { path: 'info-user/:cusuario', component: InfoUserComponent },
          { path: 'update-user/:cusuario', component: UpdateUserComponent },
          { path: 'create-user', component: CreateUserComponent }
        ]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }

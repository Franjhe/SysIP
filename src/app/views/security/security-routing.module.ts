import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importacion de Usuarios.
import { UserComponent } from './user/user.component';
import { InfoUserComponent } from './user/info-user/info-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';

//Importacion de Departamentos.
import { DepartamentComponent } from './departament/departament.component';
import { InfoDepartamentComponent } from './departament/info-departament/info-departament.component';
import { CreateDepartamentComponent } from './departament/create-departament/create-departament.component';
import { UpdateDepartamentComponent } from './departament/update-departament/update-departament.component';
import { DeleteDepartamentComponent } from './departament/delete-departament/delete-departament.component';


import { RolComponent } from './rol/rol.component';
import { MenuComponent } from './menu/menu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
          { path: 'create-user', component: CreateUserComponent },
          { path: 'delete-user/:cusuario', component: DeleteUserComponent }
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'departament',
      },
      {
        path: 'departament',
        component: DepartamentComponent,
        children: [
          { path: 'info-departament/:cdepartamento', component: InfoDepartamentComponent },
          { path: 'update-departament/:cdepartamento', component: UpdateDepartamentComponent },
          { path: 'create-departament', component: CreateDepartamentComponent },
          { path: 'delete-departament/:cdepartamento', component: DeleteDepartamentComponent }
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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

//Importacion de Roles.
import { RolComponent } from './rol/rol.component';
import { InfoRolComponent } from './rol/info-rol/info-rol.component';
import { CreateRolComponent } from './rol/create-rol/create-rol.component';
import { UpdateRolComponent } from './rol/update-rol/update-rol.component';
import { DeleteRolComponent } from './rol/delete-rol/delete-rol.component';

//Importacion de Menus.
import { MenuComponent } from './menu/menu.component';
import { InfoMenuComponent } from './menu/info-menu/info-menu.component';
import { CreateMenuComponent } from './menu/create-menu/create-menu.component';
import { UpdateMenuComponent } from './menu/update-menu/update-menu.component';
import { DeleteMenuComponent } from './menu/delete-menu/delete-menu.component';

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
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rol',
      },
      {
        path: 'rol',
        component: RolComponent,
        children: [
          { path: 'info-rol/:crol', component: InfoRolComponent },
          { path: 'update-rol/:crol', component: UpdateRolComponent },
          { path: 'create-rol', component: CreateRolComponent },
          { path: 'delete-rol/:crol', component: DeleteRolComponent }
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'menu',
      },
      {
        path: 'menu',
        component: MenuComponent,
        children: [
          { path: 'info-menu',   component: InfoMenuComponent },
          { path: 'update-menu', component: UpdateMenuComponent },
          { path: 'create-menu', component: CreateMenuComponent },
          { path: 'delete-menu', component: DeleteMenuComponent }
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

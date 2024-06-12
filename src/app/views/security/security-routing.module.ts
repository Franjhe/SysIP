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

import { InfoMainmenuComponent } from './menu/info-mainmenu/info-mainmenu.component';
import { InfoMenuComponent } from './menu/info-menu/info-menu.component';
import { InfoSubmenuComponent } from './menu/info-submenu/info-submenu.component';

import { CreateMainmenuComponent } from './menu/create-mainmenu/create-mainmenu.component';
import { CreateMenuComponent } from './menu/create-menu/create-menu.component';
import { CreateSubmenuComponent } from './menu/create-submenu/create-submenu.component';

import { UpdateMainmenuComponent } from './menu/update-mainmenu/update-mainmenu.component';
import { UpdateMenuComponent } from './menu/update-menu/update-menu.component';
import { UpdateSubmenuComponent } from './menu/update-submenu/update-submenu.component';

import { DeleteMainmenuComponent } from './menu/delete-mainmenu/delete-mainmenu.component';
import { DeleteMenuComponent } from './menu/delete-menu/delete-menu.component';
import { DeleteSubmenuComponent } from './menu/delete-submenu/delete-submenu.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'security',
    },
    canActivate: [AuthGuard],

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
          { path: 'info-mainmenu/:cmenu_principal',   component: InfoMainmenuComponent },
          { path: 'info-menu/:cmenu',   component: InfoMenuComponent },
          { path: 'info-submenu/:csubmenu',   component: InfoSubmenuComponent },
          { path: 'update-mainmenu/:cmenu_principal', component: UpdateMainmenuComponent },
          { path: 'update-menu/:cmenu', component: UpdateMenuComponent },
          { path: 'update-submenu/:csubmenu', component: UpdateSubmenuComponent },
          { path: 'create-mainmenu', component: CreateMainmenuComponent },
          { path: 'create-menu', component: CreateMenuComponent },
          { path: 'create-submenu', component: CreateSubmenuComponent },
          { path: 'delete-mainmenu/:cmenu_principal', component: DeleteMainmenuComponent },
          { path: 'delete-menu/:cmenu', component: DeleteMenuComponent },
          { path: 'delete-submenu/:csubmenu', component: DeleteSubmenuComponent }
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

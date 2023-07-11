import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from './../../material.module'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SecurityRoutingModule } from './security-routing.module';
import { UserComponent } from './user/user.component';
import { RolComponent } from './rol/rol.component';
import { DepartamentComponent } from './departament/departament.component';
import { MenuComponent } from './menu/menu.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { InfoUserComponent } from './user/info-user/info-user.component';
import { UpdateDepartamentComponent } from './departament/update-departament/update-departament.component';
import { InfoDepartamentComponent } from './departament/info-departament/info-departament.component';
import { DeleteDepartamentComponent } from './departament/delete-departament/delete-departament.component';
import { CreateDepartamentComponent } from './departament/create-departament/create-departament.component';
import { CreateRolComponent } from './rol/create-rol/create-rol.component';
import { InfoRolComponent } from './rol/info-rol/info-rol.component';
import { UpdateRolComponent } from './rol/update-rol/update-rol.component';
import { DeleteRolComponent } from './rol/delete-rol/delete-rol.component';
import { CreateMenuComponent } from './menu/create-menu/create-menu.component';
import { InfoMenuComponent } from './menu/info-menu/info-menu.component';
import { UpdateMenuComponent } from './menu/update-menu/update-menu.component';
import { DeleteMenuComponent } from './menu/delete-menu/delete-menu.component';
import { DeleteMainmenuComponent } from './menu/delete-mainmenu/delete-mainmenu.component';
import { CreateMainmenuComponent } from './menu/create-mainmenu/create-mainmenu.component';
import { InfoMainmenuComponent } from './menu/info-mainmenu/info-mainmenu.component';
import { UpdateMainmenuComponent } from './menu/update-mainmenu/update-mainmenu.component';
import { UpdateSubmenuComponent } from './menu/update-submenu/update-submenu.component';
import { CreateSubmenuComponent } from './menu/create-submenu/create-submenu.component';
import { DeleteSubmenuComponent } from './menu/delete-submenu/delete-submenu.component';
import { InfoSubmenuComponent } from './menu/info-submenu/info-submenu.component';


@NgModule({
  declarations: [
    UserComponent,
    RolComponent,
    DepartamentComponent,
    MenuComponent,
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    InfoUserComponent,
    UpdateDepartamentComponent,
    InfoDepartamentComponent,
    DeleteDepartamentComponent,
    CreateDepartamentComponent,
    CreateRolComponent,
    InfoRolComponent,
    UpdateRolComponent,
    DeleteRolComponent,
    CreateMenuComponent,
    InfoMenuComponent,
    UpdateMenuComponent,
    DeleteMenuComponent,
    DeleteMainmenuComponent,
    CreateMainmenuComponent,
    InfoMainmenuComponent,
    UpdateMainmenuComponent,
    UpdateSubmenuComponent,
    CreateSubmenuComponent,
    DeleteSubmenuComponent,
    InfoSubmenuComponent
  ],
  imports: [
    CommonModule,
    MaterialExampleModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class SecurityModule { }

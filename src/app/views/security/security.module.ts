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
    CreateDepartamentComponent
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

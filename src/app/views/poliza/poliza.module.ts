import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { PolizaRoutingModule } from './poliza-routing.module';
import { SearchComponent } from './search/search.component';
import { PolizaComponent } from './poliza.component';
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MaterialExampleModule } from './../../material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    SearchComponent,
    PolizaComponent,
    
  ],
  imports: [
    CommonModule,
    PolizaRoutingModule,
    MatTableModule,
    MatSortModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    MatPaginatorModule,

  ]
})
export class PolizaModule { }

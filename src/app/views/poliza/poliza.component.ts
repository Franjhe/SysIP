import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import { TemplateRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { clear } from 'console';
import { ActivatedRoute, Router } from '@angular/router';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.scss']
})
export class PolizaComponent implements AfterViewInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Nro_Poliza', 'Descripcion_Ramo', 'Sucursal', 'Intermediario', 'Dias_de_vigencia', 'Nombre_Asegurado', 'Id_Asegurado', 'Nro_Recibo', 'Estado_del_Recibo'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router,
    private route: ActivatedRoute, 
    private http: HttpClient,
    private snackBar: MatSnackBar) {}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit() {
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      this.http.post(environment.apiUrl + '/api/v1/poliza/searchPoliza', null).subscribe((response: any) => {
        console.log(response)
        if (response.data.list) {
          this.dataSource.data = response.data.list;
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

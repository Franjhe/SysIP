import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-ninja',
  templateUrl: './ninja.component.html',
  styleUrls: ['./ninja.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*', display: 'table-row-group' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NinjaComponent implements AfterViewInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columnsToDisplay: string[] = ['cedula', 'nombApell', 'correo', 'nrofac', 'localidad', 'plan_adquirido', 'fecha_in', 'fecha_out'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any;
  columnsName: string[] = ['Cédula', 'Nombre', 'Correo', 'Factura', 'Localidad', 'Plan', 'Fecha In.', 'Fecha Fi.'];
  expandedDetailData: any[] = [];
  columnsNameDetail: string[] = ['Nombre Acompañante', 'Item', 'Plan', 'Costo Ext.', 'Costo Local'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showTable: boolean = true;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    let data;
    this.http.post(environment.apiUrl + '/api/v1/ninjaPark/search', data).subscribe((response: any) => {
      if (response.data.list) {
        this.dataSource.data = response.data.list;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleRow(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;

    this.searchPropietary(element);
  }

  searchPropietary(element: any) {
    let data = {
      cedula: element.cedula
    };
    this.http.post(environment.apiUrl + '/api/v1/ninjaPark/detail', data).subscribe((response: any) => {
      if (response.data.list) {
        this.expandedDetailData = response.data.list;
      }
    });
  }
}

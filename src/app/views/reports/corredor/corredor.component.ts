import { TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { clear, table } from 'console';
import { Observable, map, startWith } from 'rxjs';
import { Component } from '@angular/core';

export interface productor {
  id : '' , nombre : ''
}

@Component({
  selector: 'app-corredor',
  templateUrl: './corredor.component.html',
  styleUrls: ['./corredor.component.scss']
})
export class CorredorComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  productorFormGroup = this._formBuilder.group({
    productor: ['', Validators.required],
  });
  producerControl = new FormControl('');
  filteredProducer!: Observable<any[]>;
  producerList: any = [];
  itemList: any = [];
  dataSource = new MatTableDataSource<any>;
  dataSourceindex: any;
  defaultDataSource = new MatTableDataSource<any>;
  filteredData: any;

  filterFormGroup = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    productor: new FormControl<any | productor>('', { nonNullable: true}) 
  });

  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;
  displayedColumns: string[] = ['poliza', 'recibo', 'estatus_comision', 'pcomision', 'descripcion_ramo', 'fcobro', 'productor', 'cmoneda', 'ptasamon', 'fmov', 'mcomision', 'mcomisionext', 'csolpag', 'fingreso', 'fsolicitud_mov', 'xbeneficiario', 'mpagosol', 'mpagosolext', 'cmoneda_1', 'xconcepto_1', 'mmonto_1', 'mmonto_1ext', 'cmoneda_2', 'xconcepto_2', 'mpago', 'mpagoext', 'xobserva', 'fdesde', 'fhasta'];

  private _filterBroker(value: string): string[] {
    const filterValue = value.toLowerCase();
      return this.producerList
      .map((producer: any) => producer.value)
      .filter((producer: any) => producer ? producer.toLowerCase().includes(filterValue) : '');
  }
  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    private _snackBar: MatSnackBar

  ) { }
  ngOnInit() {
    this.itemList = [];
    let rangoFecha = {}
    this.http.post(environment.apiUrl + '/api/v1/report/searchReportComi', rangoFecha).subscribe((response: any) => {
      var data = response.data
      this.defaultDataSource = new MatTableDataSource(data);
      this.dataSource = new MatTableDataSource(data);
      this.itemList = new MatTableDataSource(data).data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.getProducers();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.itemList = this.dataSource.filteredData
  }
  getProducers() {
    this.http.post(environment.apiUrl + '/api/v1/valrep/comission', null).subscribe((response: any) => {
      if (response.data) {
        for (let i = 0; i < response.data.length; i++) {
          this.producerList.push({
            id:     response.data[i].cproductor,
            nombre: response.data[i].xproductor,
          });
        }
console.log(response.data);
        this.filteredProducer = this.filterFormGroup.get('productor')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterProductor(name as string) : this.producerList.slice();
          }),
        );
      }
    }); 
  }

  private _filterProductor(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredProduct = this.producerList.filter((productor: { nombre: string; })  => productor.nombre.toLowerCase().includes(filterValue));
    return filteredProduct;
  }

  displayProductorFn(productor: any): string {
    return productor.nombre;
  } 

  productorFilter() {
    this.itemList = [];
    this.dataSource.data = []
    let data = {
      productor: this.filterFormGroup.get('productor')?.value.id
    }
    this.http.post(environment.apiUrl + '/api/v1/report/searchReportComi', data).subscribe((response: any) => {
      var data = response.data
      console.log(response.data);
      this.dataSource.data = response.data;
      this.itemList = new MatTableDataSource(data).data;
    })
  }

  dateFilter(event: any) {
    let inicio: Date = this.filterFormGroup.get('start')?.value || new Date()
    let final = this.filterFormGroup.get('end')?.value || new Date()
    let data = {
      start: new Date(inicio),
      end:   new Date(final)
    }
    this.itemList = [];
    this.dataSource.data = []
    this.http.post(environment.apiUrl + '/api/v1/report/searchReportComi', data).subscribe((response: any) => {
      var data = response.data
      this.dataSource.data = response.data;
      this.itemList = new MatTableDataSource(data).data;
    })
  }
  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = this.defaultDataSource.data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'poliza':
          return this.compare(a.poliza, b.poliza, isAsc);
        case 'recibo':
          return this.compare(a.recibo, b.recibo, isAsc);
        case 'estatus_comision':
          return this.compare(a.estatus_comision, b.estatus_comision, isAsc);
        case 'pcomision':
          return this.compare(a.pcomision, b.pcomision, isAsc);
        case 'descripcion_ramo':
          return this.compare(a.descripcion_ramo, b.descripcion_ramo, isAsc);
        case 'fcobro':
          return this.compare(a.fcobro, b.fcobro, isAsc);
        case 'productor':
          return this.compare(a.productor, b.productor, isAsc);
        case 'cmoneda':
          return this.compare(a.cmoneda, b.cmoneda, isAsc);
        case 'ptasamon':
          return this.compare(a.ptasamon, b.ptasamon, isAsc);
        case 'fmov':
          return this.compare(a.fmov, b.fmov, isAsc);
        case 'mcomision':
          return this.compare(a.mcomision, b.mcomision, isAsc);
        case 'mcomisionext':
          return this.compare(a.mcomisionext, b.mcomisionext, isAsc);
        case 'csolpag':
          return this.compare(a.csolpag, b.csolpag, isAsc);
        case 'fingreso':
          return this.compare(a.fingreso, b.fingreso, isAsc);
        case 'fsolicitud_mov':
          return this.compare(a.fsolicitud_mov, b.fsolicitud_mov, isAsc);
        case 'xbeneficiario':
          return this.compare(a.xbeneficiario, b.xbeneficiario, isAsc);
        case 'mpagosol':
          return this.compare(a.mpagosol, b.mpagosol, isAsc);
        case 'mpagosolext':
          return this.compare(a.mpagosolext, b.mpagosolext, isAsc);
        case 'cmoneda_1':
          return this.compare(a.cmoneda_1, b.cmoneda_1, isAsc);
        case 'xconcepto_1':
          return this.compare(a.xconcepto_1, b.xconcepto_1, isAsc);
        case 'mmonto_1':
          return this.compare(a.mmonto_1, b.mmonto_1, isAsc);
        case 'mmonto_1ext':
          return this.compare(a.mmonto_1ext, b.mmonto_1ext, isAsc);
        case 'cmoneda_2':
          return this.compare(a.cmoneda_2, b.cmoneda_2, isAsc);
        case 'xconcepto_2':
          return this.compare(a.xconcepto_2, b.xconcepto_2, isAsc);
        case 'mpago':
          return this.compare(a.mpago, b.mpago, isAsc);
        case 'mpagoext':
          return this.compare(a.mpagoext, b.mpagoext, isAsc);
        case 'xobserva':
          return this.compare(a.xobserva, b.xobserva, isAsc);
        case 'fdesde':
          return this.compare(a.fdesde, b.fdesde, isAsc);
        case 'fhasta':
          return this.compare(a.fhasta, b.fhasta, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  exportExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.itemList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    // XLSX.utils.format_cell()
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.  spreadsheetml.sheet' });
    saveAs(excelData, `Reporte de Bonos y Comisiones.xlsx`);
    this._snackBar.open("Reporte en Excel descargado con Éxito", "Cerrar", {
      duration: 3000,
      panelClass: ['blue-snackbar'],
    });
  }
}


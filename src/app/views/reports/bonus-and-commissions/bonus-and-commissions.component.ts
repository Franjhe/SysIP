import { Component, TemplateRef, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-bonus-and-commissions',
  templateUrl: './bonus-and-commissions.component.html',
  styleUrls: ['./bonus-and-commissions.component.scss']
})
export class BonusAndCommissionsComponent {
  producerControl = new FormControl('');
  filteredProducer!: Observable<string[]>;

  intermediarioFormGroup = this._formBuilder.group({
    intermediario: ['', Validators.required],
  });

  filterFormGroup = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    intermediario: new FormControl(null),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;

  displayedColumns: string[] = ['poliza', 'recibo', 'tipo_mov', 'descripcion', 'intermediario', 'fcobro', 'id-tomador', 'nombre-tomador', 'id-asegurado', 'nombre-asegurado', 'moneda', 'fecha-desde-rec', 'fecha-hasta-rec'];
  itemList: any = [];
  // displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>;
  dataSourceindex: any;
  defaultDataSource = new MatTableDataSource<any>;
  filteredData: any;

  producerList: any = [];

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    // private sanitizer: DomSanitizer,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.itemList = [];
    let rangoFecha = {}

    this.http.post(environment.apiUrl + '/api/v1/report/bonusAndCommissions', rangoFecha).subscribe((response: any) => {
      var data = response.data.list.search

      // console.log(response.data.list.search);

      this.defaultDataSource = new MatTableDataSource(data);
      this.dataSource = new MatTableDataSource(data);
      this.itemList = new MatTableDataSource(data).data;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    // this.http.post(environment.apiUrl + '/api/v1/valrep/producers', rangoFecha).subscribe((response: any) => {
    // this.producerList = response.data.producer
    // })
    this.getProducers();
    // console.log(this.filteredProducer);


  }

  getProducers() {
    this.http.post(environment.apiUrl + '/api/v1/valrep/producers', null).subscribe((response: any) => {
      if (response.data.producer) {
        for (let i = 0; i < response.data.producer.length; i++) {
          this.producerList.push({
            id: response.data.producer[i].cproductor,
            value: response.data.producer[i].xproductor,
          });
        }
        // this.filteredProducer = this.producerList.data
        this.filteredProducer = this.producerControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterBroker(value || ''))
        );
      }
    });
  }

  private _filterBroker(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.producerList
      .map((producer: any) => producer.value)
      .filter((producer: any) => producer ? producer.toLowerCase().includes(filterValue) : '');
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.itemList = this.dataSource.filteredData
  }

  intermediarioFilter(event: any) {
    const selectedValue = event.option.value;
    const selectedProducer = this.producerList.find((broker: any) => broker.value === selectedValue);
    console.log(selectedProducer);

    this.itemList = [];
    this.dataSource.data = []

    let body = {
      intermediario: selectedProducer.value
    }

    this.http.post(environment.apiUrl + '/api/v1/report/bonusAndCommissions', body).subscribe((response: any) => {
      var data = response.data.list.search

      console.log(response.data.list.search);

      // this.defaultDataSource = new MatTableDataSource(data);
      this.dataSource.data = response.data.list.search;
      this.itemList = new MatTableDataSource(data).data;
    })

  }

  dateFilter(event: any) {
    // console.log(event);
    let inicio: Date = this.filterFormGroup.get('start')?.value || new Date()
    let final = this.filterFormGroup.get('end')?.value || new Date()

    let body = {
      start: new Date(inicio),
      end: new Date(final)
    }

    this.itemList = [];
    this.dataSource.data = []

    this.http.post(environment.apiUrl + '/api/v1/report/bonusAndCommissions', body).subscribe((response: any) => {
      var data = response.data.list.search

      console.log(response.data.list.search);

      // this.defaultDataSource = new MatTableDataSource(data);
      this.dataSource.data = response.data.list.search;
      this.itemList = new MatTableDataSource(data).data;
    })

    // console.log(this.itemList);

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
        case '0': return this.compare(a.cproductor, b.cproductor, isAsc);
        case '1': return this.compare(a.xcliente, b.xcliente, isAsc);
        case '2': return this.compare(a.mmovcom, b.mmovcom, isAsc);
        case '3': return this.compare(a.mcomexttot, b.mcomexttot, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

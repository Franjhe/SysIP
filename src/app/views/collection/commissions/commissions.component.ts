import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss']
})
export class CommissionsComponent {

  groupReceiptsForm = this._formBuilder.group({
    agrupado: this._formBuilder.array([])
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;
  @ViewChild('Alerta1') Alerta1!: TemplateRef<any>;
  @ViewChild('procesarSolicitudesDePago') procesarSolicitudesDePago!: TemplateRef<any>;

  displayedColumns: string[] = ['select', 'cproductor', 'xnombre', 'mcomtot', 'mcomexttot', 'mcomtot2'];
  dataSource = new MatTableDataSource<any>;
  displayedColumns2: string[] = ['select', '0', '1', '2', '3', '4', '5', '6'];
  dataSource2 = new MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  selection2 = new SelectionModel<any>(true, []);

  rowsABuscar: any = [];

  total_movcom = 0;
  total_impuesto = 0;
  total_comision = 0;

  blablabla = 0;

  mamama = this._formBuilder.group({
    itransacion: '',
    csucur: '',
    fsolicit: '',
    istatsol: '',
    cci_rif: '',
    xobservaciones: '',
    // itransacion: [{ value: '', disabled: true }],
    // csucur :[{ value: '', disabled: true }],
    // fsolicit : [{ value: '', disabled: true }],
    // istatsol: [{ value: '', disabled: true }],
    // cci_rif: [{ value: '', disabled: true }],
  });

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    // private sanitizer: DomSanitizer,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    private _snackBar: MatSnackBar

  ) {
  }

  ngOnInit() {

    // fetch(environment.apiUrl +'/api/v1/commissions')
    // .then((response) => response.json())
    // .then(data => {
    //   console.log(data);

    //   // this.bcv = data.monitors.usd.price
    // })

    this.http.post(environment.apiUrl + '/api/v1/commissions/search', '').subscribe((response: any) => {
      // this.listCualquierData = response.cualquierData.search


      this.dataSource = new MatTableDataSource(response.cualquierData.search);
      console.log(this.dataSource);
      console.log('↑');

      const listPending = response.cualquierData.search

      // const sumaTotal = listPending.reduce((acumulador: any, search: { mprimabrutaext: any; }) => {

      //   acumulador += search.mprimabrutaext;

      //   return acumulador;
      // }, 0);

      // this.totalPending = sumaTotal.toFixed(2)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;
      // console.log(response);

      // for(let i = 0; i < response.data.bank.length; i++){
      //   this.bankInternational.push({
      //     id: response.data.bank[i].cbanco,
      //     value: response.data.bank[i].xbanco,
      //   })        
      // }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  dataCorredor(cproductor: any) {
    this.http.post(environment.apiUrl + '/api/v1/commissions/search/' + cproductor, '').subscribe((response: any) => {
      this.dataSource2 = new MatTableDataSource<any>;
      this.dataSource2 = new MatTableDataSource(response.cualquierData.search);
      this.Alert();
    });
  }

  Alert(config?: MatDialogConfig) {
    console.log(this.dataSource2);
    this.total_movcom = 0;
    this.total_comision = 0;

    this.dataSource2.data.forEach(row => this.selection2.select(row));
    this.dataSource2.data.forEach(row => (
      this.total_movcom += row.mmovcom,
      this.total_comision = this.total_movcom - this.total_impuesto
    ));

    return this.dialog.open(this.InfoReceipt, config);
  }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
    // this.varable1 = 100;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource2.data.forEach(row => this.selection.select(row));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected2() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
    // this.varable1 = 100;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle2() {
    this.isAllSelected2() ?
      this.selection2.clear() :
      this.dataSource2.data.forEach(row => this.selection2.select(row));
  }

  calculateMmovcom() {
    this.total_movcom = 0;
    this.total_comision = 0;
    this.selection2.selected.forEach(row => (
      this.total_movcom += row.mmovcom,
      this.total_comision = this.total_movcom - this.total_impuesto
    ));
  }

  logSelection2() {
    console.log(this.dataSource.data[0].mcomtot = this.total_comision);
    this.selection2.selected.forEach(row => console.log(row.mmovcom));
    this.dialog.closeAll();
  }

  procesarSolicitudes() {
    // console.log("Procesar solicitudes");

    this.selection.selected.forEach(row => (
      console.log(row),
      this.rowsABuscar.push(row)
    ));
    console.log(this.rowsABuscar);

    this.total_movcom = 0;
    this.total_comision = 0;
    // console.log("Salir Procesar solicitudes");
    this.showProcesarSolicitudes();
  }

  showProcesarSolicitudes(config?: MatDialogConfig) {
    this.rowsABuscar.forEach((element: any) => {
      // console.log('awpeijfoiawfopawj');

      console.log(element);

      

      // this.http.post(environment.apiUrl + '/api/v1/commissions/search/' + element.cproductor, '').subscribe((response: any) => {
      //   this.dataSource2 = new MatTableDataSource<any>;
      //   this.dataSource2 = new MatTableDataSource(response.cualquierData.search);
      //   this.Alert(); 
      // });
    });



    return this.dialog.open(this.procesarSolicitudesDePago, config);
  }

}
